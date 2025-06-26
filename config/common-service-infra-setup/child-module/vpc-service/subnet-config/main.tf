resource "aws_subnet" "public" {
  for_each = { for idx, cidr in var.public_subnets : idx => { cidr = cidr, name = var.public_subnet_names[idx] } }
  vpc_id            = var.vpc_id
  cidr_block        = each.value.cidr
  availability_zone = element(data.aws_availability_zones.available.names,  each.key)
  map_public_ip_on_launch = true

  tags = merge(
    {Name = "${var.country_environment}-${var.deployment_region}-${each.value.name}"},
    var.additional_tags

  )
   lifecycle {
    prevent_destroy = false
  }
}

resource "aws_subnet" "private" {
  for_each = { for idx, cidr in var.private_subnets : idx => { cidr = cidr, name = var.private_subnet_names[idx] } }
  vpc_id            = var.vpc_id
  cidr_block        = each.value.cidr
  availability_zone = element(data.aws_availability_zones.available.names, each.key)

   tags = merge(
    {Name = "${var.country_environment}-${var.deployment_region}-${each.value.name}"},
    var.additional_tags
  )
   lifecycle {
    prevent_destroy = false
  }
}

# resource "aws_vpc_endpoint_subnet_association" "existing_api_endpoint_association" {
#   for_each = var.api_interface_endpoint_id != "" ? aws_subnet.private : {}
#   vpc_endpoint_id = var.api_interface_endpoint_id
#   subnet_id       = each.value.id
# }


data "aws_availability_zones" "available" {}
