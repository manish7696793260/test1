resource "aws_network_acl" "network_acl" {
  vpc_id     = var.vpc_id
  tags = merge(
  {
    Name = "${var.country_environment}-${var.deployment_region}-${var.project}-nacl"
  },
  var.additional_tags
)
}
resource "aws_network_acl_association" "private_subnet_nacl_association" {
  for_each       = var.private_subnet_ids
  network_acl_id = aws_network_acl.network_acl.id
  subnet_id      = each.value
}
 
resource "aws_network_acl_association" "public_subnet_nacl_association" {
  for_each       = var.public_subnet_ids
  network_acl_id = aws_network_acl.network_acl.id
  subnet_id      = each.value
}


resource "aws_network_acl_rule" "inbound" {
  for_each = { for rule in var.inbound_rules : "${rule.rule_number}-${rule.protocol}-${rule.from_port}-${rule.to_port}" => rule }

  network_acl_id = aws_network_acl.network_acl.id
  rule_number    = each.value.rule_number
  egress         = false
  protocol       = each.value.protocol
  rule_action    = each.value.rule_action
  cidr_block     = each.value.cidr_block
  from_port      = each.value.from_port
  to_port        = each.value.to_port
}

resource "aws_network_acl_rule" "outbound" {
  for_each = { for rule in var.outbound_rules : "${rule.rule_number}-${rule.protocol}-${rule.from_port}-${rule.to_port}" => rule }

  network_acl_id = aws_network_acl.network_acl.id
  rule_number    = each.value.rule_number
  egress         = true
  protocol       = each.value.protocol
  rule_action    = each.value.rule_action
  cidr_block     = each.value.cidr_block
  from_port      = each.value.from_port
  to_port        = each.value.to_port
}



