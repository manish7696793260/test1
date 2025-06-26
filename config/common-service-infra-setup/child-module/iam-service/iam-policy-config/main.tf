locals {
  iam_policy_config = var.iam_policy_config
  tag_variables = {
    "default_additional_tags"      = var.default_additional_tags,
    "sync_additional_tags" = var.sync_additional_tags
    "auth_additional_tags" = var.auth_additional_tags
    "common_initial_additional_tags" = var.common_initial_additional_tags
    # Add all possible tag variables here
  }
}

data "aws_caller_identity" "current" {}

data "template_file" "iam_policy_template" {
  for_each = local.iam_policy_config
  template = file(each.value.iam_policy_template_path)
  vars = merge({
    # common variables
    region = var.aws_region
    account_id=data.aws_caller_identity.current.account_id
    environment = var.environment
    country_environment = var.country_environment
    deployment_region = var.deployment_region
  }, 
  try(each.value.template_variable, {}) 
  )
}
 
resource "aws_iam_policy" "iam_policy_for_role" {
  for_each = local.iam_policy_config
  name        = "${var.prefix}-${each.value.iam_policy_name}"
  path        = "/"
  description = "AWS IAM Policy for managing aws role"
  policy = data.template_file.iam_policy_template[each.key].rendered
 
 
  tags = merge(
    lookup(local.tag_variables, each.value.tag, {})
  )
  
  lifecycle {
      prevent_destroy = false
      create_before_destroy = false
    }
}
 
resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
  for_each = local.iam_policy_config
  role       = "${var.prefix}-${each.value.iam_role_name}" 
  lifecycle {
      prevent_destroy = false
    }
  policy_arn = aws_iam_policy.iam_policy_for_role[each.key].arn
}