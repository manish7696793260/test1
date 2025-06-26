variable "prefix" {}
variable "iam_role_config" {
  type = map(object({
    iam_role_name = string
    assume_role_services = string
    assume_role_policy_template_path = string
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
