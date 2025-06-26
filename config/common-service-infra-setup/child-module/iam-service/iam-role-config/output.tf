output "iam_roles" {
  description = "Details of the created IAM roles (ARN and Name)"
  value = {
    for k, v in aws_iam_role.iam_role : k => {
      arn  = v.arn
      name = v.name
    }
  }
}