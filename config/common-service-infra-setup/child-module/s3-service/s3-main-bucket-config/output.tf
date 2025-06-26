output "s3_bucket_info" {
  value = {
    for k, v in aws_s3_bucket.s3_bucket : k => {
      id                = v.id
      arn               = v.arn
      bucket_name       = v.bucket
      bucket_domain_name = v.bucket_domain_name
      versioning_status = aws_s3_bucket_versioning.bucket_versioning[k].versioning_configuration[0].status
      lifecycle_rules = lookup(local.s3_buckets[k], "lifecycle_rules", []) # Safely get lifecycle rules
    }
  }
  description = "Map containing information about each created S3 bucket, including lifecycle rules"
}