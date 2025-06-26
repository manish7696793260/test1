output "iam_policy_role_attachments" {
  description = "Mapping of IAM Policy Names to the Full IAM Role Names they are attached to"
  value = {
    for k, policy in aws_iam_policy.iam_policy_for_role :
    policy.name => aws_iam_role_policy_attachment.attach_iam_policy_to_iam_role[k].role
  }
}