output "web_acl_arn" {
  value = var.existing_waf_name != "" ? data.aws_wafv2_web_acl.existing[0].arn : aws_wafv2_web_acl.web_acl[0].arn
}
