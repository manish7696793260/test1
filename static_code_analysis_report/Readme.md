# Static Code Analysis Report

Package intended to be used code build phase of code pipeline to process static code analysis report.

## Installation

You can install  via npm:

```bash
npm install static_code_analysis_report@<latest_version>

```

## Prerequisites

Since this is deployed in aws code artifact repository, the service using this package should be able to have the necessary permissions for the aws code artifact repository usage.

Create a .npmrc file with registry configuration

registry=https://<domain-name>-<account_number>.d.codeartifact.us-west-2.amazonaws.com/npm/<repo-name>/
//<domain-name>-<account_number>.d.codeartifact.us-west-2.amazonaws.com/npm/<repo-name>/:always-auth=true
//<domain-name>-<account_number>.d.codeartifact.us-west-2.amazonaws.com/npm/<repo-name>/:_authToken=${CODEARTIFACT_AUTH_TOKEN}

Generate code artifact token with following command

export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain <domain-name> --domain-owner <account_number> --region us-west-2 --query authorizationToken --output text`

## Usage

Need to have the following environment variables

#V1.0.0
OPERATIONS_BUCKET - Bucket Name for template and storage
DESTINATION_EMAIL_ADDRESS - Email address
SOURCE_EMAIL_ADDRESS - From Email
CC_EMAIL - // Comma seperated string
ENV - Environment
STATIC_CODE_REPORT_HTML_PATH - path from importing module to the static code analysis report html file
REPOSITORY - Repository name which creating the report
PROJECT - Vitalsight / OFC
ALWAYS_SEND - 0 / 1, If need to send the email always

#v2.0.0
OPERATIONS_BUCKET - Bucket Name for template and storage
STATIC_CODE_ANALYSIS_REPORT_DESTINATION_EMAIL_ADDRESS - Email address
STATIC_CODE_ANALYSIS_REPORT_SOURCE_EMAIL_ADDRESS - From Email
STATIC_CODE_ANALYSIS_REPORT_CC_EMAIL - // Comma seperated string
ENV - Environment
STATIC_CODE_REPORT_HTML_PATH - path from importing module to the static code analysis report html file
REPOSITORY - Repository name which creating the report
PROJECT - Vitalsight / OFC
ALWAYS_SEND - 0 / 1, If need to send the email always

import the module

call the function generateReport