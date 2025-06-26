variable "prefix" {}
variable "web_acl_arn" {}

variable "cloudfront_config" {
  type = map(object({
    bucket_name = string
    acm_certificate_domain = string
    path = optional(string)
    subdomain_name       = optional(string)
    cloudfront_oac_name = string
    default_certificate = optional(bool) 
    no_domain_prefix = optional(bool,false)
    no_bucket_prefix  = optional(bool,false)
    existing_domain_name  = optional(string, "")
    ttl  = optional(string)
    tag = string
  }))
  
  description = "Map of S3 bucket configurations"
}

variable "sync_additional_tags" {}
variable "sync_non_prd_additional_tags" {}
variable "auth_additional_tags" {}
variable "auth_non_prd_additional_tags" {}
variable "default_additional_tags" {}
variable "default_non_prd_additional_tags" {}
variable "common_initial_additional_tags" {}
variable "common_initial_non_prd_additional_tags" {}