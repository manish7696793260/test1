variable "vpc_id" {
  description = "VPC ID to associate subnets with"
  type        = string
}

variable "public_subnets" {
  description = "CIDR blocks for public subnets."
  type        = list(string)
}

variable "private_subnets" {
  description = "CIDR blocks for private subnets."
  type        = list(string)
}

variable "public_subnet_names" {}

variable "private_subnet_names" {}

variable "additional_tags" {}

variable "country_environment" {}
variable "deployment_region" {}
#variable "api_interface_endpoint_id" {}
