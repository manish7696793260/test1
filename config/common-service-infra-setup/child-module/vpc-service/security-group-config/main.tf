locals{
  tag_variables = {
    "default_additional_tags"      = var.default_additional_tags,
    "sync_additional_tags" = var.sync_additional_tags
    "auth_additional_tags" = var.auth_additional_tags
    "common_initial_additional_tags" = var.common_initial_additional_tags
    # Add all possible tag variables here
  }
}
resource "aws_security_group" "security_group" {
  for_each = { for sg in var.security_groups : sg.name => sg }

  name        = "${var.prefix}-${var.project}-${each.value.name}-security-group"
  description = each.value.description
  vpc_id      = var.vpc_id

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
      Name = "${var.prefix}-${var.project}-${each.value.name}-security-group"
    },
    lookup(local.tag_variables, each.value.tag, {})
  )
}


