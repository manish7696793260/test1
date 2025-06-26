output "security_group_id" {
  value = {
    for name, sg in aws_security_group.security_group : name => sg.id
  }
}
