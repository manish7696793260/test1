output "subnet_ids" {
  value = {
    public_subnet_id = {for k, v in aws_subnet.public : k => v.id }
    private_subnet_id = {for k, v in aws_subnet.private : k => v.id }
  }
}

output "public_subnet_ids" {
  value = { for k, v in aws_subnet.public : k => v.id }
}

output "private_subnet_ids" {
  value = { for k, v in aws_subnet.private : k => v.id }
}

