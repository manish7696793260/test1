output "cloudfront_distributions" {
  value = { for k, v in aws_cloudfront_distribution.cloudfront_distribution : k => {
    id          = v.id
    arn         = v.arn
    aliases     = v.aliases
    web_acl_id  = v.web_acl_id
    domain_name = v.domain_name
  } }
  description = "Information about the CloudFront distributions"
}

output "oacs" {
  value = { for k, v in aws_cloudfront_origin_access_control.cloudfront_origin_access_control : k => {
    id          = v.id
    name        = v.name
    }
  }
  description = "Information about the CloudFront Origin Access Controls"
}

output "cloudfront_route53_records" {
  value = {
    for key, record in aws_route53_record.cloudfront_record :
    key => {
      name     = record.name
      type     = record.type
      ttl      = record.ttl
      records  = record.records
      zone_id  = record.zone_id
      fqdn     = record.fqdn
    }
  }
  description = "Details of Route53 records for cloudfront"
}