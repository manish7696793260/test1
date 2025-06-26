##--S3 Module Output
output "s3_buckets_detailed_info" {
  value = module.s3_bucket.s3_bucket_info
  description = "Detailed information about each created S3 bucket from the child module"
}


##--Cloudfront Module Output.

output "cloudfront_distributions" {
  value = module.cloudfront_distribution.cloudfront_distributions
  description = "Information about the CloudFront distributions"
}

output "cloudfront_route53_records" {
  value = module.cloudfront_distribution.cloudfront_route53_records
  description = "Details of Route53 records for cloudfront"
}
output "oacs" {
  value = module.cloudfront_distribution.oacs
  description = "Information about the CloudFront Origin Access Controls"
}

##--IAM Module Output

output "iam_roles" {
  description = "Details of the created IAM roles (ARN and Name)"
  value = module.iam_role.iam_roles
}

output "iam_policy_role_attachments" {
  description = "Mapping of IAM Policy Names to the IAM Role Names they are attached to"
  value = module.iam_policy_for_role.iam_policy_role_attachments
}

##--VPC Module Output
output "vpc_config" {
  description = "VPC Config for the module"
  value       = module.vpc.vpc_config
}

output "subnet_ids" {
  value = module.subnet.subnet_ids
}

output "nacl_id" {
  value = module.nacl.nacl_id
}


##--WAF Module Output

output "web_acl_arn" {
  value = module.waf.web_acl_arn
}

##-Security group Module Output

output "security_group_ids" {
  value = module.security_groups.security_group_id
}