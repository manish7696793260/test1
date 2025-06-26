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

data "aws_wafv2_web_acl" "existing" {
  count = var.existing_waf_name != "" ? 1 : 0
  name  = var.existing_waf_name
  scope = var.scope
  provider = aws.global
}

resource "aws_wafv2_web_acl" "web_acl" {
  count = (var.existing_waf_name == "" && (var.environment == "dev" || var.environment == "prd")) ? 1 : 0
  name  = var.new_waf_name
  scope = var.scope
  provider = aws.global

  default_action {
    allow {}
  }

  # First Rule: Blacklist Rule 1
  rule {
    name     = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-BlackListRule"
    priority = 0

    action {
      block {}
    }

    statement {
      or_statement {
        statement {
          ip_set_reference_statement {
            arn = var.ipset_ipv4_blacklist
          }
        }
        statement {
          ip_set_reference_statement {
            arn = var.ipset_ipv6_blacklist
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-BlackListRule"
      sampled_requests_enabled   = true
    }
  }

  # Second Rule: Whitelist Rule 2 (Same OR condition but different name)
  
  rule {
    name     = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-WhiteListRule"
    priority = 1  

    action {
      allow {}
    }

    statement {
      or_statement {
        statement {
          ip_set_reference_statement {
            arn = var.ipset_ipv4_whitelist
          }
        }
        statement {
          ip_set_reference_statement {
            arn = var.ipset_ipv6_whitelist
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-WhiteListRule"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf"
    sampled_requests_enabled   = true
  }

  rule {
    name     = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-rate-limit"
    priority = 2

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit                = 500
        evaluation_window_sec = 300
        aggregate_key_type    = "IP"
      }
    }

    visibility_config {
      sampled_requests_enabled   = true
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-rate-limit"
    }
  }

  rule {
    name     = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-ScannersProbesRule"
    priority = 3

    action {
      block {}
    }

    statement {
      or_statement {
        statement {
          ip_set_reference_statement {
            arn = var.ipv4_ScannersProbesRule
          }
        }
        statement {
          ip_set_reference_statement {
            arn = var.ipv6_ScannersProbesRule
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-ScannersProbesRule"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-Content-Length-header-size-count-rule"
    priority = 4

    action {
      count {} # This only counts requests instead of blocking them
    }

    statement {
      size_constraint_statement {
        field_to_match {
          single_header {
            name = "content-length"
          }
        }
        comparison_operator = "GT"
        size                = 8100

        text_transformation {
          priority = 0
          type     = "NONE"
        }
      }
    }

    visibility_config {
      sampled_requests_enabled   = true
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-Content-Length-header-size-count-rule"
    }
  }

  rule {
    name     = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-IPReputationListsRule"
    priority = 5

    action {
      block {}
    }

    statement {
      or_statement {
        statement {
          ip_set_reference_statement {
            arn = var.ipset_ipv4_IPReputationListsRule
          }
        }
        statement {
          ip_set_reference_statement {
            arn = var.ipset_ipv6_IPReputationListsRule
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-IPReputationListsRule"
      sampled_requests_enabled   = true
    }
  }

   rule {
    name     = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-BadBotRule"
    priority = 6

    action {
      block {}
    }

    statement {
      or_statement {
        statement {
          ip_set_reference_statement {
            arn = var.ipset_ipv4_BadBotRule
          }
        }
        statement {
          ip_set_reference_statement {
            arn = var.ipset_ipv6_BadBotRule
          }
        }
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-BadBotRule"
      sampled_requests_enabled   = true
    }
  }


  rule {
    name     = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-SqlInjectionRule"
    priority = 7

    action {
      block {}
    }

    statement {
      or_statement {
        statement {
          sqli_match_statement {
            field_to_match {
              query_string {}
            }
            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }
            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        statement {
          sqli_match_statement {
            field_to_match {
              body {
                oversize_handling = "CONTINUE"
              }
            }
            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }
            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        statement {
          sqli_match_statement {
            field_to_match {
              uri_path {}
            }
            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }
            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        statement {
          sqli_match_statement {
            field_to_match {
              single_header {
                name = "authorization"
              }
            }
            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }
            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        statement {
          sqli_match_statement {
            field_to_match {
              single_header {
                name = "cookie"
              }
            }
            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }
            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }
      }
    }

    visibility_config {
      sampled_requests_enabled   = true
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-SqlInjectionRule"
    }
  }

    rule {
    name     = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-XssRule"
    priority = 8

    action {
      block {}
    }

    statement {
      or_statement {
        statement {
          xss_match_statement {
            field_to_match {
              query_string {}
            }
            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }
            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        statement {
          xss_match_statement {
            field_to_match {
              body {
                oversize_handling = "CONTINUE"
              }
            }
            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }
            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        statement {
          xss_match_statement {
            field_to_match {
              uri_path {}
            }
            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }
            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }

        statement {
          xss_match_statement {
            field_to_match {
              single_header {
                name = "cookie"
              }
            }
            text_transformation {
              priority = 1
              type     = "URL_DECODE"
            }
            text_transformation {
              priority = 2
              type     = "HTML_ENTITY_DECODE"
            }
          }
        }
      }
    }

    visibility_config {
      sampled_requests_enabled   = true
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.country_environment}-${var.deployment_region}-common-cdn-waf-XssRule"
    }
  }


}







