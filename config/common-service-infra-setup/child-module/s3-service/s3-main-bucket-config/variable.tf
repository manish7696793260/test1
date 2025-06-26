variable "prefix" {}

variable "s3_buckets_config" {
  type = map(object({
    bucket_name       = string
    bucket_versioning = string
    tag = string
    lifecycle_rules = optional(list(object({
    id      = string
    prefix  = optional(string)
    days    = optional(number)
    transition = optional(list(object({
        days          = number
        storage_class = string
      })), []) 
  })))
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