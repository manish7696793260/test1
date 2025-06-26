locals {
  prefix = "${var.country_environment}-${var.deployment_region}"
  np_and_prd_prefix = "${var.environment == "prd" ? var.country_environment : var.non_prd_env }-${var.deployment_region}"
  np_and_prd_additional_tags = "${var.environment == "prd" ?var.additional_tags :  var.non_prd_additional_tags }"
}

data "aws_region" "current_aws_account" {}

resource "aws_vpc" "new_or_existing_vpc" {
  count = var.vpc_id == "" ? 1 : 0
  cidr_block = var.cidr_block
  enable_dns_support     = true
  enable_dns_hostnames   = true
  tags = merge(
  { 
  Name = "${local.np_and_prd_prefix}-${var.vpc_project}-vpc" },
  local.np_and_prd_additional_tags
  )
   lifecycle {
    prevent_destroy = false
  }
}

resource "aws_internet_gateway" "igw" {
  count  = var.internet_gateway_id == "" ? 1 : 0
  vpc_id = var.vpc_id != "" ? var.vpc_id : aws_vpc.new_or_existing_vpc[0].id
  tags = merge(
  { Name = "${local.np_and_prd_prefix}-${var.vpc_project}-igw" },
  local.np_and_prd_additional_tags
  )
   lifecycle {
    prevent_destroy = false
  }
}

resource "aws_route_table" "public" {
  count  = length(var.public_subnets_ids) > 0 ? 1 : 0  # Create only if public subnets exist
  vpc_id = var.vpc_id != "" ? var.vpc_id : aws_vpc.new_or_existing_vpc[0].id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = var.internet_gateway_id != "" ? var.internet_gateway_id : aws_internet_gateway.igw[0].id
  }

  tags = merge(
    { Name = "${local.prefix}-${var.project}-public-route-table" },
    var.additional_tags
  )
   lifecycle {
    prevent_destroy = false
  }
}


resource "aws_route_table" "private" {
  vpc_id = var.vpc_id != "" ? var.vpc_id : aws_vpc.new_or_existing_vpc[0].id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = var.nat_gateway_id != "" ? var.nat_gateway_id : aws_nat_gateway.nat[0].id
  }

  tags = merge(
    { Name = "${local.prefix}-${var.project}-private-route-table" },
    var.additional_tags
  )
   lifecycle {
    prevent_destroy = false
  }
}


# Create an Elastic IP for NAT Gateway (only if new VPC is created)
resource "aws_eip" "nat_eip" {
  count = var.nat_gateway_id == "" ? 1 : 0
  domain = "vpc"

     tags = merge(
       {Name = "${local.np_and_prd_prefix}-${var.vpc_project}-eip" },       
       local.np_and_prd_additional_tags                  
)
 lifecycle {
    prevent_destroy = false
  }
}



resource "aws_nat_gateway" "nat" {
  count         = var.nat_gateway_id == "" ? 1 : 0
  allocation_id = aws_eip.nat_eip[0].id
  subnet_id     = var.existing_subnet_id == "" ? var.public_subnets_ids[0] : var.existing_subnet_id # NAT should be in a public subnet

  tags = merge(
  { Name = "${local.np_and_prd_prefix}-${var.vpc_project}-nat-gateway" },
  local.np_and_prd_additional_tags
  )
  
   lifecycle {
    prevent_destroy = false
  }

  depends_on = [aws_internet_gateway.igw]
}


resource "aws_route_table_association" "public" {
  for_each = var.public_subnets_ids
  subnet_id      = each.value  
  route_table_id = aws_route_table.public[0].id
  
}

resource "aws_route_table_association" "private" {
  for_each = var.private_subnets_ids
  subnet_id      = each.value  
  route_table_id = aws_route_table.private.id

}

#---------------------------VPC Endpoint--------------------------------------
resource "aws_vpc_endpoint" "s3_gateway_endpoint" {
  count             = var.existing_s3_gateway_endpoint_id == "" ? 1 : 0
  vpc_id            = var.vpc_id != "" ? var.vpc_id : aws_vpc.new_or_existing_vpc[0].id
  service_name      = "com.amazonaws.${data.aws_region.current_aws_account.name}.s3"
  vpc_endpoint_type = "Gateway"

  lifecycle {
    prevent_destroy = false
    ignore_changes  = [route_table_ids]
  }
 
    tags = merge(
      { Name = "${local.np_and_prd_prefix}-${var.vpc_project}-s3-gateway-endpoint" },
      local.np_and_prd_additional_tags
    )
  }
 
 
resource "aws_vpc_endpoint_route_table_association" "existing_s3_endpoint_association" {
    vpc_endpoint_id  = var.existing_s3_gateway_endpoint_id != "" ? var.existing_s3_gateway_endpoint_id : aws_vpc_endpoint.s3_gateway_endpoint[0].id
    route_table_id   = aws_route_table.private.id
  }



resource "aws_vpc_endpoint" "dynamodb_gateway_endpoint" {
  count             = var.existing_dynamodb_gateway_endpoint_id == "" ? 1 : 0
  vpc_id            = var.vpc_id != "" ? var.vpc_id : aws_vpc.new_or_existing_vpc[0].id
  service_name      = "com.amazonaws.${data.aws_region.current_aws_account.name}.dynamodb"
  vpc_endpoint_type = "Gateway"
 
  lifecycle {
    prevent_destroy = false
    ignore_changes  = [route_table_ids]
  }
  
  tags = merge(
    { Name = "${local.np_and_prd_prefix}-${var.vpc_project}-dynamodb-gateway-endpoint" },
    local.np_and_prd_additional_tags
  )
}
 
 
resource "aws_vpc_endpoint_route_table_association" "existing_dynamodb_endpoint_association" {
  vpc_endpoint_id  = var.existing_dynamodb_gateway_endpoint_id != "" ? var.existing_dynamodb_gateway_endpoint_id : aws_vpc_endpoint.dynamodb_gateway_endpoint[0].id
  route_table_id   = aws_route_table.private.id
}


resource "aws_vpc_endpoint" "api_interface_endpoint" {
  count =  var.existing_api_interface_endpoint_id == "" ? 1 : 0

  vpc_id = var.vpc_id != "" ? var.vpc_id : aws_vpc.new_or_existing_vpc[0].id
  service_name = "com.amazonaws.${data.aws_region.current_aws_account.name}.execute-api"
  vpc_endpoint_type = "Interface"

  subnet_ids         = values(var.private_subnets_ids)
  security_group_ids = [aws_security_group.security_group["api-interface-endpoint"].id]
  private_dns_enabled = false

  lifecycle {
    prevent_destroy = false
  }

  tags = merge(
    { Name = "${local.np_and_prd_prefix}-${var.vpc_project}-api-interface-endpoint" },  
    local.np_and_prd_additional_tags
  )
}

resource "aws_security_group" "security_group" {

  for_each = var.existing_api_interface_endpoint_id == "" ? {
    for sg in var.security_groups : sg.name => sg
  } : {}

  name        = "${local.np_and_prd_prefix}-${var.vpc_project}-${each.value.name}-security-group"
  description = "${local.np_and_prd_prefix}-${var.vpc_project}-${each.value.name}-security-group"
  vpc_id = var.vpc_id != "" ? var.vpc_id : aws_vpc.new_or_existing_vpc[0].id

  dynamic "ingress" {
    for_each = each.value.ingress_rules
    content {
      description      = ingress.value.description
      from_port        = ingress.value.from_port
      to_port          = ingress.value.to_port
      protocol         = ingress.value.protocol
      cidr_blocks      = ingress.value.cidr_blocks
      ipv6_cidr_blocks = ingress.value.ipv6_cidr_blocks
      prefix_list_ids  = ingress.value.prefix_list_ids
      security_groups  = ingress.value.security_groups
    }
  }

  dynamic "egress" {
    for_each = each.value.egress_rules
    content {
      description      = egress.value.description
      from_port        = egress.value.from_port
      to_port          = egress.value.to_port
      protocol         = egress.value.protocol
      cidr_blocks      = egress.value.cidr_blocks
      ipv6_cidr_blocks = egress.value.ipv6_cidr_blocks
      prefix_list_ids  = egress.value.prefix_list_ids
      security_groups  = egress.value.security_groups
    }
  }

  tags = merge(
    {
      Name = "${local.np_and_prd_prefix}-${var.vpc_project}-${each.value.name}-security-group"
    },
    local.np_and_prd_additional_tags
  )
}

