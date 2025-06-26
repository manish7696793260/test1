
locals {
  s3_buckets = var.s3_buckets_config
  tag_variables = {
    "default_additional_tags"      = var.default_additional_tags,
    "sync_additional_tags" = var.sync_additional_tags
    "auth_additional_tags" = var.auth_additional_tags
    "common_initial_additional_tags" = var.common_initial_additional_tags
    # Add all possible tag variables here
  }
}

resource "aws_s3_bucket" "s3_bucket" {
    for_each = local.s3_buckets
    bucket = "${var.prefix}-${each.value.bucket_name}"
    tags = merge(
    lookup(local.tag_variables, each.value.tag, {})
  )
    lifecycle {
      prevent_destroy = false
    }
}

resource "aws_s3_bucket_versioning" "bucket_versioning" {
  for_each = local.s3_buckets
  bucket = aws_s3_bucket.s3_bucket[each.key].id
  versioning_configuration {
    status = each.value.bucket_versioning 
  }

}


resource "aws_s3_bucket_lifecycle_configuration" "lifecycle_rule" {
  for_each = {
    for k, v in local.s3_buckets : k => v if length(v.lifecycle_rules) > 0
  }

  bucket = aws_s3_bucket.s3_bucket[each.key].id

  dynamic "rule" {
    for_each = each.value.lifecycle_rules

    content {
      id     = rule.value.id
      status = "Enabled"

      filter {
        
        prefix = rule.value.prefix
      }
      # Transition configuration (optional)
      dynamic "transition" {
        for_each = can(rule.value.transition) ? rule.value.transition : []
        content {
          days          = transition.value.days
          storage_class = transition.value.storage_class
        }
      }
      expiration {
        days = rule.value.days
      }
    }
  }
}