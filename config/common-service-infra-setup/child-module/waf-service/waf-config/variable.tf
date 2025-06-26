variable "new_waf_name" {
  description = "Name of the WebACL"
  type        = string
}

variable "scope" {
  description = "Scope of WAF (REGIONAL for ALB/API Gateway, CLOUDFRONT for CloudFront)"
  type        = string
}

variable "existing_waf_name" {}
variable "ipset_ipv4_whitelist" {}
variable "ipset_ipv6_whitelist" {}
variable "deployment_region" {}
variable "country_environment" {}
variable "ipv4_ScannersProbesRule"{}
variable "ipv6_ScannersProbesRule" {}
variable "ipset_ipv4_blacklist" {}
variable "ipset_ipv6_blacklist" {}
variable "ipset_ipv4_IPReputationListsRule" {}
variable "ipset_ipv6_IPReputationListsRule" {}
variable "ipset_ipv4_BadBotRule" {}
variable "ipset_ipv6_BadBotRule" {}
variable "environment" {}