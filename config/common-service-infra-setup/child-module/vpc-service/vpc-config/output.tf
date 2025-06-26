output "vpc_config" {
  description = "VPC Config for the module"
  value       = {
  vpc_id       = var.vpc_id == "" ? aws_vpc.new_or_existing_vpc[0].id : var.vpc_id 
  igw_id       = var.internet_gateway_id == "" ? aws_internet_gateway.igw[0].id : var.internet_gateway_id 
  nat_id       = var.nat_gateway_id == "" ? aws_nat_gateway.nat[0].id : var.nat_gateway_id 
  s3_gateway_endpoint       = var.existing_s3_gateway_endpoint_id != "" ? var.existing_s3_gateway_endpoint_id : (length(aws_vpc_endpoint.s3_gateway_endpoint) > 0 ? aws_vpc_endpoint.s3_gateway_endpoint[0].id : null)
  dynamodb_gateway_endpoint       = var.existing_dynamodb_gateway_endpoint_id != "" ? var.existing_dynamodb_gateway_endpoint_id : (length(aws_vpc_endpoint.dynamodb_gateway_endpoint) > 0 ? aws_vpc_endpoint.dynamodb_gateway_endpoint[0].id : null)
  api_interface_endpoint = var.existing_api_interface_endpoint_id != "" ? var.existing_api_interface_endpoint_id : (length(aws_vpc_endpoint.api_interface_endpoint) > 0 ? aws_vpc_endpoint.api_interface_endpoint[0].id : null)
  nat_eip       = var.vpc_id == "" ? aws_eip.nat_eip[0].id : null
  public_route_table_id = length(aws_route_table.public) > 0 ? aws_route_table.public[0].id : null
  private_route_table_id       = aws_route_table.private.id
}
}


output "vpc_id" {
  description = "The ID of the created or existing VPC"
  value       = var.vpc_id != "" ? var.vpc_id : aws_vpc.new_or_existing_vpc[0].id
}

// Output Internet Gateway ID (new or existing)
output "internet_gateway_id" {
  description = "The Internet Gateway ID"
  value       = var.internet_gateway_id != "" ? var.internet_gateway_id : aws_internet_gateway.igw[0].id
}


// Output Public Route Table ID (new or existing VPC)
output "public_route_table_id" {
  value = length(aws_route_table.public) > 0 ? aws_route_table.public : null
}

// Output Private Route Table ID (new or existing VPC)
output "private_route_table_id" {
  description = "The ID of the private route table"
  value       = aws_route_table.private.id
}

output "nat_eip_id" {
  description = "The ID of the Elastic IP for the NAT Gateway"
  value       = var.vpc_id == "" ? aws_eip.nat_eip[0].id : null
}

# output "nat_gateway_id" {
#   description = "The NAT Gateway ID"
#   value       = var.nat_gateway_id != "" ? var.nat_gateway_id : aws_nat_gateway.nat[0].id
# }

# output "s3_vpc_endpoint_id" {
#   description = "The ID of the S3 VPC Endpoint"
#   value       = var.existing_s3_vpc_endpoint_id != "" ? var.existing_s3_vpc_endpoint_id : (length(aws_vpc_endpoint.s3) > 0 ? aws_vpc_endpoint.s3[0].id : null)
# }
 
 
# output "dynamodb_vpc_endpoint_id" {
#   description = "The ID of the DynamoDB VPC Endpoint"
#   value       = var.existing_dynamodb_vpc_endpoint_id != "" ? var.existing_dynamodb_vpc_endpoint_id : (length(aws_vpc_endpoint.dynamodb) > 0 ? aws_vpc_endpoint.dynamodb[0].id : null)
# }


# output "api_interface_vpc_endpoint_id" {
#   description = "The ID of the API Gateway VPC Endpoint"
#   value       = var.existing_vpc_gateway_endpoint_id != "" ? var.existing_vpc_gateway_endpoint_id : (length(aws_vpc_endpoint.api_gateway) > 0 ? aws_vpc_endpoint.api_interface_endpoint[0].id : null)
# }

