output "waf_ipv4_set_arn" {
  description = "The ARN of the created WAFv2 IP Se IP4"
  value       = aws_wafv2_ip_set.ipset_cloudfront_ipv4.arn
}

output "waf_ipv6_set_arn" {
    description = "The ARN of the created WAFv2 IP Set IPV6"
    value = aws_wafv2_ip_set.ipset_cloudfront_ipv6.arn
}

output "ScannersProbesRule_ipv4_ip_set_arn" {
  description = "ARN of the IPv4 IP Set"
  value       = aws_wafv2_ip_set.ipv4_ScannersProbesRule.arn
}

output "ScannersProbesRule_ipv6_ip_set_arn" {
  description = "ARN of the IPv6 IP Set"
  value       = aws_wafv2_ip_set.ipv6_ScannersProbesRule.arn
}

output "BlacklistSetIPV4_arn" {
  description = "ARN of the CloudFront IPv4 Blacklist IP Set"
  value       = aws_wafv2_ip_set.ipset_cloudfront_ipv4_blacklist.arn
}

output "BlacklistSetIPV6_arn" {
  description = "ARN of the CloudFront IPv6 Blacklist IP Set"
  value       = aws_wafv2_ip_set.ipset_cloudfront_ipv6_blacklist.arn
}

output "IPReputationListsRule_IPV4_arn" {
  description = "ARN of the CloudFront IPv4 IP Reputation Lists Rule IP Set"
  value       = aws_wafv2_ip_set.ipset_cloudfront_ipv4_IPReputationListsRule.arn
}

output "IPReputationListsRule_IPV6_arn" {
  description = "ARN of the CloudFront IPv6 IP Reputation Lists Rule IP Set"
  value       = aws_wafv2_ip_set.ipset_cloudfront_ipv6_IPReputationListsRule.arn
}

output "BadBotRule_IPV4_arn" {
  description = "ARN of the CloudFront IPv4 Bad Bot Rule IP Set"
  value       = aws_wafv2_ip_set.ipset_cloudfront_ipv4_BadBotRule.arn
}

output "BadBotRule_IPV6_arn" {
  description = "ARN of the CloudFront IPv6 Bad Bot Rule IP Set"
  value       = aws_wafv2_ip_set.ipset_cloudfront_ipv6_BadBotRule.arn
}
