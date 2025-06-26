terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      configuration_aliases = [
        aws.global
      ]
    }
  }
}

resource "aws_wafv2_ip_set" "ipset_cloudfront_ipv4" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-WhitelistSetIPV4"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-WhitelistSetIPV4"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV4"
  addresses          = []
  provider = aws.global
}

resource "aws_wafv2_ip_set" "ipset_cloudfront_ipv6" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-WhitelistSetIPV6"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-WhitelistSetIPV6"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV6"
  addresses          = []
  provider           = aws.global

}

# IPv4 IP Set
resource "aws_wafv2_ip_set" "ipv4_ScannersProbesRule" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-ScannersProbesRuleIPV4"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-ScannersProbesRuleIPV4"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV4"
  addresses          = []
  provider           = aws.global
}

# IPv6 IP Set
resource "aws_wafv2_ip_set" "ipv6_ScannersProbesRule" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-ScannersProbesRuleIPV6"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-ScannersProbesRuleIPV6"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV6"
  addresses          = []
  provider           = aws.global
}

resource "aws_wafv2_ip_set" "ipset_cloudfront_ipv4_blacklist" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-BlacklistSetIPV4"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-BlacklistSetIPV4"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV4"
  addresses          = []
  provider = aws.global
}

resource "aws_wafv2_ip_set" "ipset_cloudfront_ipv6_blacklist" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-BlacklistSetIPV6"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-BlacklistSetIPV6"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV6"
  addresses          = []
  provider           = aws.global

}

resource "aws_wafv2_ip_set" "ipset_cloudfront_ipv4_IPReputationListsRule" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-IPReputationListsRuleIPV4"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-IPReputationListsRuleIPV4"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV4"
  addresses          = []
  provider = aws.global
}

resource "aws_wafv2_ip_set" "ipset_cloudfront_ipv6_IPReputationListsRule" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-IPReputationListsRuleIPV6"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-IPReputationListsRuleIPV6"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV6"
  addresses          = []
  provider           = aws.global

}

resource "aws_wafv2_ip_set" "ipset_cloudfront_ipv4_BadBotRule" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-BadBotRuleIPV4"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-BadBotRuleIPV4"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV4"
  addresses          = []
  provider = aws.global
}

resource "aws_wafv2_ip_set" "ipset_cloudfront_ipv6_BadBotRule" {
  name               = "${var.country_environment}-${var.deployment_region}-common-waf-BadBotRuleIPV6"
  description        = "${var.country_environment}-${var.deployment_region}-common-waf-BadBotRuleIPV6"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV6"
  addresses          = []
  provider           = aws.global

}





