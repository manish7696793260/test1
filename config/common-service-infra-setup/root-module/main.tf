locals {
  prefix = "${var.country_environment}-${var.deployment_region}"
}

##--S3 Module

module "s3_bucket" {

    source = "./../child-module/s3-service/s3-main-bucket-config"
    s3_buckets_config = var.s3_buckets_config
    prefix= local.prefix
    sync_additional_tags = var.sync_additional_tags
    sync_non_prd_additional_tags = var.sync_non_prd_additional_tags
    auth_additional_tags = var.auth_additional_tags
    auth_non_prd_additional_tags = var.auth_non_prd_additional_tags
    default_additional_tags = var.default_additional_tags
    default_non_prd_additional_tags = var.default_non_prd_additional_tags
    common_initial_additional_tags = var.common_initial_additional_tags
    common_initial_non_prd_additional_tags = var.common_initial_non_prd_additional_tags
}



##--Cloudfront Module

module "cloudfront_distribution" {
  depends_on = [module.s3_bucket]
  source = "./../child-module/cloudfront-service/cloudfront-main-config"
  prefix= local.prefix
  web_acl_arn = module.waf.web_acl_arn
  cloudfront_config = var.cloudfront_config
  providers = {  
    aws.global = aws.global
  }
  sync_additional_tags = var.sync_additional_tags
  sync_non_prd_additional_tags = var.sync_non_prd_additional_tags
  auth_additional_tags = var.auth_additional_tags
  auth_non_prd_additional_tags = var.auth_non_prd_additional_tags
  default_additional_tags = var.default_additional_tags
  default_non_prd_additional_tags = var.default_non_prd_additional_tags
  common_initial_additional_tags = var.common_initial_additional_tags
  common_initial_non_prd_additional_tags = var.common_initial_non_prd_additional_tags
}



##--IAM Module

module "iam_role" {

  source                         = "./../child-module/iam-service/iam-role-config"
  iam_role_config = var.iam_role_config
  prefix= local.prefix
  sync_additional_tags = var.sync_additional_tags
  sync_non_prd_additional_tags = var.sync_non_prd_additional_tags
  auth_additional_tags = var.auth_additional_tags
  auth_non_prd_additional_tags = var.auth_non_prd_additional_tags
  default_additional_tags = var.default_additional_tags
  default_non_prd_additional_tags = var.default_non_prd_additional_tags
  common_initial_additional_tags = var.common_initial_additional_tags
  common_initial_non_prd_additional_tags = var.common_initial_non_prd_additional_tags
}



module "iam_policy_for_role" {

  source              = "./../child-module/iam-service/iam-policy-config"
  depends_on = [module.iam_role]
  prefix= local.prefix
  iam_policy_config = var.iam_policy_config
  environment = var.environment
  aws_region = var.aws_region
  country_environment =var.country_environment
  deployment_region =  var.deployment_region 
  sync_additional_tags = var.sync_additional_tags
  sync_non_prd_additional_tags = var.sync_non_prd_additional_tags
  auth_additional_tags = var.auth_additional_tags
  auth_non_prd_additional_tags = var.auth_non_prd_additional_tags
  default_additional_tags = var.default_additional_tags
  default_non_prd_additional_tags = var.default_non_prd_additional_tags
  common_initial_additional_tags = var.common_initial_additional_tags
  common_initial_non_prd_additional_tags = var.common_initial_non_prd_additional_tags
}



##--VPC Module
module "vpc" {
  source = "./../child-module/vpc-service/vpc-config"
  
  vpc_id = var.vpc_id
  internet_gateway_id = var.internet_gateway_id
  nat_gateway_id = var.nat_gateway_id
  cidr_block = var.cidr_block
  existing_subnet_id = var.existing_subnet_id
  public_subnets_ids = module.subnet.public_subnet_ids
  private_subnets_ids = module.subnet.private_subnet_ids
  existing_api_interface_endpoint_id = var.existing_api_interface_endpoint_id
  existing_s3_gateway_endpoint_id = var.existing_s3_gateway_endpoint_id
  existing_dynamodb_gateway_endpoint_id =  var.existing_dynamodb_gateway_endpoint_id
  security_groups = var.interface_endpoint_security_group
  project = "${var.project}"
  environment= var.environment
  vpc_project=var.vpc_name
  country_environment="${var.country_environment}"
  non_prd_env= var.non_prd_env
  additional_tags = var.default_additional_tags
  non_prd_additional_tags=var.default_non_prd_additional_tags
  deployment_region= var.deployment_region
  
}



module "subnet" {
  source = "./../child-module/vpc-service/subnet-config"
  vpc_id = module.vpc.vpc_id
  public_subnets      = var.public_subnets
  public_subnet_names = var.public_subnet_names
  private_subnets      = var.private_subnets
  private_subnet_names = var.private_subnet_names
  additional_tags = var.default_additional_tags
  country_environment = var.country_environment
  deployment_region = var.deployment_region
  }



##--WAF Module

module "waf" {

  source = "./../child-module/waf-service/waf-config"
 
  new_waf_name       = "${var.environment == "prd" ?  var.country_environment : var.non_prd_env }-${var.deployment_region}-${var.project}-cdn-waf-acl"
  scope             = var.scope
  existing_waf_name = var.existing_waf_name
  ipset_ipv4_whitelist           = try(module.waf_rules[0].waf_ipv4_set_arn, null)
  ipset_ipv6_whitelist           = try(module.waf_rules[0].waf_ipv6_set_arn, null)
  ipv4_ScannersProbesRule        = try(module.waf_rules[0].ScannersProbesRule_ipv4_ip_set_arn, null)
  ipv6_ScannersProbesRule        = try(module.waf_rules[0].ScannersProbesRule_ipv6_ip_set_arn, null)
  ipset_ipv4_blacklist           = try(module.waf_rules[0].BlacklistSetIPV4_arn, null)
  ipset_ipv6_blacklist           = try(module.waf_rules[0].BlacklistSetIPV6_arn, null)
  ipset_ipv4_IPReputationListsRule = try(module.waf_rules[0].IPReputationListsRule_IPV4_arn, null)
  ipset_ipv6_IPReputationListsRule = try(module.waf_rules[0].IPReputationListsRule_IPV6_arn, null)
  ipset_ipv4_BadBotRule          = try(module.waf_rules[0].BadBotRule_IPV4_arn, null)
  ipset_ipv6_BadBotRule          = try(module.waf_rules[0].BadBotRule_IPV6_arn, null)
 
  country_environment = "${var.environment == "prd" ? var.country_environment : var.non_prd_env }"
  deployment_region   = var.deployment_region
  environment= var.environment
  providers = {
    aws.global = aws.global
  }
}
 


module "waf_rules" {
  source = "./../child-module/waf-service/waf-rules-config"
  count = var.existing_waf_name == "" ? 1 : 0
  deployment_region = var.deployment_region
  country_environment = "${var.environment == "prd" ?  var.country_environment : var.non_prd_env }"
   providers = {  
    aws.global = aws.global
  }
}


##--NACL Module

module "nacl" {

  source       = "./../child-module/vpc-service/nacl-config"
  vpc_id       = module.vpc.vpc_id
  inbound_rules  = var.inbound_rules
  outbound_rules = var.outbound_rules
  additional_tags= var.default_additional_tags
  deployment_region = var.deployment_region
  country_environment = var.country_environment
  project = var.project
  private_subnet_ids = module.subnet.private_subnet_ids
  public_subnet_ids = module.subnet.public_subnet_ids

}

#--Security group Module
module "security_groups" {
  source = "./../child-module/vpc-service/security-group-config"
  prefix = local.prefix
  security_groups = var.security_groups
  project = var.project
  vpc_id = module.vpc.vpc_id
  sync_additional_tags = var.sync_additional_tags
  sync_non_prd_additional_tags = var.sync_non_prd_additional_tags
  auth_additional_tags = var.auth_additional_tags
  auth_non_prd_additional_tags = var.auth_non_prd_additional_tags
  default_additional_tags = var.default_additional_tags
  default_non_prd_additional_tags = var.default_non_prd_additional_tags
  common_initial_additional_tags = var.common_initial_additional_tags
  common_initial_non_prd_additional_tags = var.common_initial_non_prd_additional_tags
}


