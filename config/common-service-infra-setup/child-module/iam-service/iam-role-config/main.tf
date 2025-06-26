locals {
  iam_role_config = var.iam_role_config
  tag_variables = {
    "default_additional_tags"      = var.default_additional_tags,
    "sync_additional_tags" = var.sync_additional_tags
    "auth_additional_tags" = var.auth_additional_tags
    "common_initial_additional_tags" = var.common_initial_additional_tags
    # Add all possible tag variables here
  }
}

data "template_file" "assume_role_policy" {
  for_each = local.iam_role_config
  template = file(each.value.assume_role_policy_template_path)
  vars = {
    services = each.value.assume_role_services
  }
}
 
 
resource "aws_iam_role" "iam_role" {
  for_each = local.iam_role_config
  name = "${var.prefix}-${each.value.iam_role_name}"
  assume_role_policy = "${data.template_file.assume_role_policy[each.key].rendered}"
   tags = merge(
    lookup(local.tag_variables, each.value.tag, {})
  )
  lifecycle {
      prevent_destroy = false
      create_before_destroy = true
    }
}