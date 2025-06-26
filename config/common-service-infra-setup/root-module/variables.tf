##--Common Global Variables

variable "aws_region" {}
variable  "environment" {}
variable "country_environment" {}
variable "deployment_region" {}
variable "non_prd_env" {}
variable "project" {}
variable "sync_additional_tags" {}
variable "sync_non_prd_additional_tags" {}
variable "auth_additional_tags" {}
variable "auth_non_prd_additional_tags" {}
variable "default_additional_tags" {}
variable "default_non_prd_additional_tags" {}
variable "common_initial_additional_tags" {}
variable "common_initial_non_prd_additional_tags" {}

##--S3 Module Variable

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


##--Cloudfront Module Variable

variable "cloudfront_config" {
  type = map(object({
    bucket_name = string
    tag = string
    acm_certificate_domain = string
    path = optional(string)
    subdomain_name       = optional(string)
    cloudfront_oac_name = string
    default_certificate = optional(bool) 
    no_domain_prefix = optional(bool,false)
    no_bucket_prefix  = optional(bool,false)
    existing_domain_name  = optional(string, "")
    ttl  = optional(string)
  }))
  
  description = "Map of S3 bucket configurations"
}

##--IAM Module Variable

variable "iam_role_config" {
  type = map(object({
    iam_role_name = string
    assume_role_services = string
    assume_role_policy_template_path = string
    tag =  string
  }))
}

variable "iam_policy_config" {
  type = map(object({
    iam_policy_template_path = string
    iam_policy_name = string
    iam_role_name = string
    tag = string
    template_variable = optional(map(any), {})
  }))
}


##--VPC Module Variable

variable "vpc_id" {
  description = "Existing VPC ID. If empty, a new VPC will be created."
  type        = string
  default     = ""
}

variable "cidr_block" {}

variable "public_subnets" {
  description = "CIDR blocks for public subnets."
  type        = list(string)
}

variable "private_subnets" {
  description = "CIDR blocks for private subnets."
  type        = list(string)
}

variable "public_subnet_names" {
  description = "Names for public subnets."
  type        = list(string)
}

variable "private_subnet_names" {
  description = "Names for private subnets."
  type        = list(string)
}

variable "internet_gateway_id" {}
variable "nat_gateway_id" {}
variable "vpc_name" {}
variable "existing_api_interface_endpoint_id" {}
variable "existing_dynamodb_gateway_endpoint_id" {}
variable "existing_s3_gateway_endpoint_id" {}
variable "interface_endpoint_security_group" {}
variable "existing_subnet_id" {}


##--NACL Module Variable

variable "inbound_rules" {}
variable "outbound_rules" {}


##--WAF Module Variable

variable "existing_waf_name" {}
variable "scope" {
  description = "Scope of WAF (REGIONAL for ALB/API Gateway, CLOUDFRONT for CloudFront)"
  type        = string
}


##--Secutriy Group Module Variable

variable "security_groups" {
  description = "List of security groups with rules"
  type = list(object({
    name  = string
    description          = string
    tag = string
    ingress_rules        = list(object({
      description       = string
      from_port         = number
      to_port           = number
      protocol          = string
      cidr_blocks       = list(string)
      ipv6_cidr_blocks  = list(string)
      prefix_list_ids   = list(string)
      security_groups   = list(string)
    }))
    egress_rules         = list(object({
      description       = string
      from_port         = number
      to_port           = number
      protocol          = string
      cidr_blocks       = list(string)
      ipv6_cidr_blocks  = list(string)
      prefix_list_ids   = list(string)
      security_groups   = list(string)
    }))
  }))
}









