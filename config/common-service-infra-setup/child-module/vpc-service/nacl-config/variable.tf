variable "vpc_id" {
  type        = string
  description = "The ID of the VPC."
}

variable "private_subnet_ids" {}
variable "public_subnet_ids" {}

variable "inbound_rules" {
  type = list(object({
    rule_number = number
    protocol    = string
    rule_action = string
    cidr_block  = string
    from_port   = number
    to_port     = number
  }))
  description = "List of inbound NACL rules."

}

variable "outbound_rules" {
  type = list(object({
    rule_number = number
    protocol    = string
    rule_action = string
    cidr_block  = string
    from_port   = number
    to_port     = number
  }))
  description = "List of outbound NACL rules."

}

variable "country_environment" {}
variable "deployment_region" {}
variable "project" {}
variable "additional_tags" {}

