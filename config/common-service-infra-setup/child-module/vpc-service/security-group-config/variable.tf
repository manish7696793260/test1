variable "security_groups" {
  description = "List of security groups with rules"
  type = list(object({
    name  = string
    tag = string
    description          = string
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


variable "prefix" {}
variable "project" {}
variable "vpc_id" {}

variable "sync_additional_tags" {}
variable "sync_non_prd_additional_tags" {}
variable "auth_additional_tags" {}
variable "auth_non_prd_additional_tags" {}
variable "default_additional_tags" {}
variable "default_non_prd_additional_tags" {}
variable "common_initial_additional_tags" {}
variable "common_initial_non_prd_additional_tags" {}
