# search lines with [ CTRL+F = Update required ] and Update it.

##--Common Variables In Infra Modules
aws_region = "us-west-2"
environment = "prd"                                                    #  Update required
non_prd_env = "usnp"
country_environment = "usprd"                                          #  Update required
deployment_region = "usw2"
project = "common"
default_additional_tags = {
  "ohi:project"     = "common",
  "ohi:application" = "common",
  "ohi:module"      = "common-infra",
  "ohi:environment" = "usprd-usw2",                                     #  Update required
  "ohi:stack-name"  = "usprd-usw2-common-tf-initial-setup-pipeline"     #  Update required
  }
default_non_prd_additional_tags= {
  "ohi:project"     = "common",
  "ohi:application" = "common",
  "ohi:module"      = "common-infra",
  "ohi:environment" = "usnp-usw2",                                      #  Update required
  "ohi:stack-name"  = "usprd-usw2-common-tf-initial-setup-pipeline"     #  Update required
  }
sync_additional_tags = {
  "ohi:project"     = "common",
  "ohi:application" = "common-sync",
  "ohi:module"      = "common-sync-be",
  "ohi:environment" = "usprd-usw2",                                     #  Update required
  "ohi:stack-name"  = "usprd-usw2-common-tf-initial-setup-pipeline"     #  Update required
  }
sync_non_prd_additional_tags= {
  "ohi:project"     = "common",
  "ohi:application" = "common-sync",
  "ohi:module"      = "common-sync-be",
  "ohi:environment" = "usnp-usw2",                                      #  Update required
  "ohi:stack-name"  = "usprd-usw2-common-tf-initial-setup-pipeline"    #  Update required
  }
auth_additional_tags = {
  "ohi:project"     = "common",
  "ohi:application" = "common-auth",
  "ohi:module"      = "common-auth-be",
  "ohi:environment" = "usprd-usw2",                                     #  Update required
  "ohi:stack-name"  = "usprd-usw2-common-tf-initial-setup-pipeline"     #  Update required
  }
auth_non_prd_additional_tags= {
  "ohi:project"     = "common",
  "ohi:application" = "common-auth",
  "ohi:module"      = "common-auth-be",
  "ohi:environment" = "usnp-usw2",                                      #  Update required
  "ohi:stack-name"  = "usprd-usw2-common-tf-initial-setup-pipeline"    #  Update required
  }
common_initial_additional_tags = {
  "ohi:project"     = "common",
  "ohi:application" = "common-initial",
  "ohi:module"      = "common-initial-be",
  "ohi:environment" = "usprd-usw2",                                     #  Update required
  "ohi:stack-name"  = "usprd-usw2-common-tf-initial-setup-pipeline"     #  Update required
  }
common_initial_non_prd_additional_tags= {
  "ohi:project"     = "common",
  "ohi:application" = "common-initial",
  "ohi:module"      = "common-initial-be",
  "ohi:environment" = "usnp-usw2",                                      #  Update required
  "ohi:stack-name"  = "usprd-usw2-common-tf-initial-setup-pipeline"    #  Update required
  }







# Cloudfront Manual Variables                                            
existing_waf_name=""                                                       #  Update required
scope="CLOUDFRONT"


##--VPC Module Variable
vpc_id = "<vpc-id>"                                           #  Update required
nat_gateway_id = "<nat-id>"                                   #  Update required
existing_subnet_id = ""                                                    #  Update required
internet_gateway_id = "<igw-id>"                              #  Update required
existing_api_interface_endpoint_id = "<vpce-id>"              #  Update required
existing_s3_gateway_endpoint_id = "<vpce-id>"                 #  Update required
existing_dynamodb_gateway_endpoint_id =  "<vpce-id>"  
vpc_name= "vlt"
cidr_block  = "<cidr>"                                                #  Update required
public_subnets    = []
private_subnets =["<cidr>","<cidr>"]                        #  Update required
public_subnet_names = []
private_subnet_names =["common-lambda-private-subnet-1","common-lambda-private-subnet-2"]

interface_endpoint_security_group = [
  {
    name = "api-interface-endpoint"
    description         = "api-interface-endpoint"

    ingress_rules = [
      {
        description       = "Allow outbound HTTP"
        from_port         = 80
        to_port           = 80
        protocol          = "tcp"
        cidr_blocks       = ["0.0.0.0/0"]
        ipv6_cidr_blocks  = []
        prefix_list_ids   = []
        security_groups   = []
      },
            {
        description       = "Allow outbound HTTPS"
        from_port         = 443
        to_port           = 443
        protocol          = "tcp"
        cidr_blocks       = ["0.0.0.0/0"]
        ipv6_cidr_blocks  = []
        prefix_list_ids   = []
        security_groups   = []
      }
    ]

    egress_rules = [
      {
        description       = "Allow all egress"
        from_port         = 0
        to_port           = 0
        protocol          = "-1"
        cidr_blocks       = ["0.0.0.0/0"]
        ipv6_cidr_blocks  = []
        prefix_list_ids   = []
        security_groups   = []
      }
    ]
  }
]

##--S3 Module Variables
s3_buckets_config = {
  "common-s3" = {
    bucket_name       = "common-s3" # Ensure globally unique, including location context
    tag="default_additional_tags"
    bucket_versioning = "Disabled"
    lifecycle_rules = [
       { id = "delete-mobile-automated-ut-reports", prefix = "operations/automated-ut-reports/mobile/", days = 90 },
       { id = "delete-eslint-reports", prefix = "operations/static-code-report/", days = 180 }
    
    ]
  }

}



##--Cloudfront Module Variables
cloudfront_config = {
  "common-s3" = {
    bucket_name = "common-s3"                    # Note if existing bucket is being passed then make sure it should be in same region as aws_region variable
    tag="default_additional_tags"
    cloudfront_oac_name = "common-s3-oac"
    default_certificate = false                                      #  Update required
    path = "terms"
    no_domain_prefix = true                                        #  Update required
    no_bucket_prefix = false    
    acm_certificate_domain = "prd.us.ohiomron.com"                                      #  Update required
    existing_domain_name  = "prd.us.ohiomron.com"                   #  Update required
    subdomain_name = "common-terms-cdn.prd.us.ohiomron.com"                #  Update required
    ttl  = "60"                                                     #  Update required
  }
}



##--IAM Role Module Variable
iam_role_config = {
  Role1 = {
  iam_role_name = "common-sync-lambda-role"
  assume_role_services = "lambda.amazonaws.com"
  assume_role_policy_template_path = "./../resource-policy-template/iam-assume-role-policy-template/lambda-assume-role-policy.tpl"
  tag="sync_additional_tags"
  },
  Role2 = {
  iam_role_name = "common-auth-lambda-role"
  assume_role_services = "lambda.amazonaws.com"
  assume_role_policy_template_path = "./../resource-policy-template/iam-assume-role-policy-template/lambda-assume-role-policy.tpl"
  tag="auth_additional_tags"
  },
  Role3 = {
  iam_role_name = "common-be-lambda-role"
  assume_role_services = "lambda.amazonaws.com"
  assume_role_policy_template_path = "./../resource-policy-template/iam-assume-role-policy-template/lambda-assume-role-policy.tpl"
  tag="common_initial_additional_tags"
  }
} 




iam_policy_config = {
  sync-policy1 = {
    iam_role_name         = "common-sync-lambda-role"
    iam_policy_name       = "common-sync-cloudwatch-read-write-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-sync-service-lambda-role/cloudwatch.tpl"
    tag="sync_additional_tags"
    },
  sync-policy2 = {
    iam_role_name         = "common-sync-lambda-role"
    iam_policy_name       = "common-sync-lambda-read-write-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-sync-service-lambda-role/lambda_invoke.tpl"
    tag="sync_additional_tags"
    },
  sync-policy3 = {
    iam_role_name         = "common-sync-lambda-role"
    iam_policy_name       = "common-sync-dynamodb-read-write-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-sync-service-lambda-role/dynamodb.tpl"
    tag="sync_additional_tags"
    },
  sync-policy4 = {
    iam_role_name         = "common-sync-lambda-role"
    iam_policy_name       = "common-sync-ec2-read-write-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-sync-service-lambda-role/ec2.tpl"
    tag="sync_additional_tags"
    },
  sync-policy5 = {
    iam_role_name         = "common-sync-lambda-role"
    iam_policy_name       = "common-sync-s3-read-write-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-sync-service-lambda-role/s3.tpl"
    tag="sync_additional_tags"
    },
  sync-policy6 = {
    iam_role_name         = "common-sync-lambda-role"
    iam_policy_name       = "common-sync-ses-read-write-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-sync-service-lambda-role/ses.tpl"
    template_variable = {
      ses =  "<ses>"                                       #  Update required
    }
    tag="sync_additional_tags"
   },
  auth-policy1 = {
    iam_role_name         = "common-auth-lambda-role"
    iam_policy_name       = "common-auth-cloudwatch-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-auth-service-lambda-role/cloudwatch.tpl"
    tag="auth_additional_tags"
    },
  auth-policy2 = {
    iam_role_name         = "common-auth-lambda-role"
    iam_policy_name       = "common-auth-lambda-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-auth-service-lambda-role/lambda_invoke.tpl"
    tag="auth_additional_tags"
    },
  auth-policy3 = {
    iam_role_name         = "common-auth-lambda-role"
    iam_policy_name       = "common-auth-dynamodb-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-auth-service-lambda-role/dynamodb.tpl"
    tag="auth_additional_tags"
    },
  auth-policy4 = {
    iam_role_name         = "common-auth-lambda-role"
    iam_policy_name       = "common-auth-ec2-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-auth-service-lambda-role/ec2.tpl"
    tag="auth_additional_tags"
    },
  auth-policy5 = {
    iam_role_name         = "common-auth-lambda-role"
    iam_policy_name       = "common-auth-s3-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-auth-service-lambda-role/s3.tpl"
    tag="auth_additional_tags"
    },
  auth-policy6 = {
    iam_role_name         = "common-auth-lambda-role"
    iam_policy_name       = "common-auth-ses-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-auth-service-lambda-role/ses.tpl"
    template_variable = {
      ses =  "<ses>"                                                    #  Update required
    }
    tag="auth_additional_tags"
    },
  auth-policy7 = {
    iam_role_name         = "common-auth-lambda-role"
    iam_policy_name       = "common-auth-cognito-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-auth-service-lambda-role/cognito.tpl"
     template_variable = {
      cognito="<cognito-id>"                                                           #  Update required
     }
     tag="auth_additional_tags"
    },
  be-policy1 = {
    iam_role_name         = "common-be-lambda-role"
    iam_policy_name       = "common-be-cloudwatch-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-be-lambda-role/cloudwatch.tpl"
    tag="common_initial_additional_tags"
    },
  be-policy2 = {
    iam_role_name         = "common-be-lambda-role"
    iam_policy_name       = "common-be-lambda-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-be-lambda-role/lambda_invoke.tpl"
    tag="common_initial_additional_tags"
    },
  be-policy3 = {
    iam_role_name         = "common-be-lambda-role"
    iam_policy_name       = "common-be-dynamodb-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-be-lambda-role/dynamodb.tpl"
    tag="common_initial_additional_tags"
    },
  be-policy4 = {
    iam_role_name         = "common-be-lambda-role"
    iam_policy_name       = "common-be-ec2-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-be-lambda-role/ec2.tpl"
    tag="common_initial_additional_tags"
    },
  be-policy5 = {
    iam_role_name         = "common-be-lambda-role"
    iam_policy_name       = "common-be-s3-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-be-lambda-role/s3.tpl"
    tag="common_initial_additional_tags"
    },
  be-policy6 = {
    iam_role_name         = "common-be-lambda-role"
    iam_policy_name       = "common-be-ses-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-be-lambda-role/ses.tpl"
    template_variable = {
      ses =  "<ses>"                                             #  Update required
    }
    tag="common_initial_additional_tags"
    },
  be-policy7 = {
    iam_role_name         = "common-be-lambda-role"
    iam_policy_name       = "common-be-cognito-readwrite-access-policy"
    iam_policy_template_path = "./../resource-policy-template/iam-policy-permission-template/common-be-lambda-role/cognito.tpl"
    template_variable = {
      cognito="<cognito-id>"                                                      #  Update required
     }
     tag="common_initial_additional_tags"
    }
}


##--NACL Module Variable
inbound_rules = [
 {
    rule_number = 100
    protocol    = "-1"   
    rule_action = "allow"
    cidr_block  = "0.0.0.0/0"
    from_port   = 0      
    to_port     = 0      
  }
]

outbound_rules = [
  {
    rule_number = 100
    protocol    = "-1"   
    rule_action = "allow"
    cidr_block  = "0.0.0.0/0"
    from_port   = 0      
    to_port     = 0      
  }
]

security_groups = [
  {
    name = "lambda"
    description         = "lambda"
    tag="default_additional_tags"
    ingress_rules = []
    egress_rules = [
  {
    description = "usprd-ofs-user-report"              #  Update required
    from_port   = 6061
    to_port     = 6061
    protocol    = "tcp"
    security_groups = ["<ec2-sg>"]         #  Update required
    ipv6_cidr_blocks  = []
    prefix_list_ids   = []
    cidr_blocks = []
  },
  {
    description = "Allow outbound HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks  = []
    prefix_list_ids   = []
    security_groups   = []
  },

  {
    description = "Allow outbound to a specific service"
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks  = []
    prefix_list_ids   = []
    security_groups   = []
  }]
  }
]