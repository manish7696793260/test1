terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      configuration_aliases = [
        aws.global
      ]
    }
  }
}

locals {
  cloudfront_config = var.cloudfront_config
  cloudfront_mapping_with_dns = {
    for key, config in local.cloudfront_config :
    key => config if try(config.existing_domain_name != "", false)
  }
  tag_variables = {
    "default_additional_tags"      = var.default_additional_tags,
    "sync_additional_tags" = var.sync_additional_tags
    "auth_additional_tags" = var.auth_additional_tags
    "common_initial_additional_tags" = var.common_initial_additional_tags
    # Add all possible tag variables here
  }
}

data "aws_acm_certificate" "existing_cdn_acm_certificate" {
  for_each = local.cloudfront_config
  provider    = aws.global
  domain      = each.value.acm_certificate_domain
}

data "aws_s3_bucket" "s3_bucket" {
  for_each=local.cloudfront_config
  bucket = each.value.no_bucket_prefix ? each.value.bucket_name : "${var.prefix}-${each.value.bucket_name}"
}

data "aws_route53_zone" "existing_zone" {
  for_each = local.cloudfront_mapping_with_dns
  name = each.value.existing_domain_name 
}

resource "aws_cloudfront_origin_access_control" "cloudfront_origin_access_control" {
    for_each = local.cloudfront_config
    description                       = "Default Origin Access Control"
    name                              = "${var.prefix}-${each.value.cloudfront_oac_name}"
    origin_access_control_origin_type = "s3"
    signing_behavior                  = "always"
    signing_protocol                  = "sigv4"
    lifecycle {
      prevent_destroy = false
    }
}

resource "aws_cloudfront_distribution" "cloudfront_distribution" {
  for_each = local.cloudfront_config

  lifecycle {
      prevent_destroy = false
    }

  enabled = true
  is_ipv6_enabled = true
  comment         = "CloudFront distribution for ${data.aws_s3_bucket.s3_bucket[each.key].bucket}"

  origin {
    domain_name              = "${data.aws_s3_bucket.s3_bucket[each.key].bucket_domain_name}"
    origin_id                = "S3Origin"
    origin_path              = ""
    origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront_origin_access_control[each.key].id
  }

  default_root_object = ""

  default_cache_behavior {
    target_origin_id       = "S3Origin"
    viewer_protocol_policy = "redirect-to-https"
    
    allowed_methods = ["GET", "HEAD"]
    cached_methods  = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }
   
   aliases = each.value.default_certificate ? [] : [each.value.no_domain_prefix ? each.value.subdomain_name : "${var.prefix}-${each.value.subdomain_name}"]
   
   viewer_certificate {
    cloudfront_default_certificate = each.value.default_certificate
    acm_certificate_arn            = each.value.default_certificate ? null : data.aws_acm_certificate.existing_cdn_acm_certificate[each.key].arn
    ssl_support_method             = each.value.default_certificate ? null : "sni-only"

    minimum_protocol_version = "TLSv1.2_2021"
  }

 restrictions {
    geo_restriction {
      restriction_type = "none"
      
    }
  }
  tags = merge(
    lookup(local.tag_variables, each.value.tag, {})
  )
  
  web_acl_id = var.web_acl_arn
  
}
resource "aws_s3_bucket_policy" "cloudfront_bucket_policy" {
  for_each = local.cloudfront_config
  bucket = data.aws_s3_bucket.s3_bucket[each.key].bucket

  policy = jsonencode({
    Version = "2008-10-17"
    Id      = "PolicyForCloudFrontPrivateContent"
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = each.value.path != null && each.value.path != "" ? "${data.aws_s3_bucket.s3_bucket[each.key].arn}/${each.value.path}/*" : "${data.aws_s3_bucket.s3_bucket[each.key].arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.cloudfront_distribution[each.key].arn
          }
        }
      }
    ]
  })

  depends_on = [aws_cloudfront_distribution.cloudfront_distribution]
}




resource "aws_route53_record" "cloudfront_record" {
  for_each = local.cloudfront_mapping_with_dns
  zone_id = data.aws_route53_zone.existing_zone[each.key].zone_id
  name    = each.value.no_domain_prefix ? each.value.subdomain_name : "${var.prefix}-${each.value.subdomain_name}"
  type    = "CNAME"
  ttl     = each.value.ttl
  records = [aws_cloudfront_distribution.cloudfront_distribution[each.key].domain_name]
  lifecycle {
    prevent_destroy = false
  }


}