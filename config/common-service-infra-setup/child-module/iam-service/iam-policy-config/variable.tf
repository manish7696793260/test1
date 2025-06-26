variable "prefix" {}
variable  "environment" {}
variable "aws_region" {}
variable "deployment_region" {}
variable "country_environment" {}

variable "iam_policy_config" {
  type = map(object({
    iam_policy_template_path = string
    iam_policy_name = string
    iam_role_name = string
    template_variable = optional(map(any), {})
    tag = string
  }))
}

variable "sync_additional_tags" {}
variable "sync_non_prd_additional_tags" {}
variable "auth_additional_tags" {}
variable "auth_non_prd_additional_tags" {}
variable "default_additional_tags" {}
variable "default_non_prd_additional_tags" {}
variable "common_initial_additional_tags" {}
variable "common_initial_non_prd_additional_tags" {}