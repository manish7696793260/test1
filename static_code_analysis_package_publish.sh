#!/bin/bash

DOMAIN_NAME=us-omron-code-artifact
REPOSITORY_NAME=us-omron-common-packages
if [ "$AWS_REGION" == "eu-west-1" ]; then
        REPOSITORY_NAME=eu-omron-common-packages
        DOMAIN_NAME=eu-omron-code-artifact
fi
ACCOUNT_NUMBER=$(echo "$CODEBUILD_BUILD_ARN" | awk -F: '{print $5}')
REPOSITORY_DETAILS=$(aws codeartifact describe-repository --domain ${DOMAIN_NAME} --domain-owner ${ACCOUNT_NUMBER} --repository ${REPOSITORY_NAME})
REMOTE_REPO_NAME=$(echo "$REPOSITORY_DETAILS" | jq -r '.repository.name')

if [ "$REPOSITORY_NAME" == "$REMOTE_REPO_NAME" ]; then
        PACKAGE_NAME=$(jq '.name' ./static_code_analysis_report/package.json)
        PACKAGE_NAME=$(echo  "$PACKAGE_NAME" | tr -d '"')
        PUBLISH_FLAG=false
        PACKAGE_VERSION=$(aws codeartifact list-package-versions --package ${PACKAGE_NAME} --domain ${DOMAIN_NAME} --domain-owner ${ACCOUNT_NUMBER} \
        --repository ${REPOSITORY_NAME} --format npm --output text --query 'defaultDisplayVersion')
        PACKAGE_VERSION_NUMBER=$(echo  "$PACKAGE_VERSION" | tr -d '.')
        VALID=false
        if [[ "$PACKAGE_VERSION_NUMBER" =~ ^-?[0-9]+$ ]]; then
                VALID=true
        else
                PUBLISH_FLAG=true
        fi
        if [[ "$VALID" == true ]]; then
                INCOMING_VERSION=$(jq '.version' ./static_code_analysis_report/package.json)
                INCOMING_VERSION_NUMBER=$(echo  "$INCOMING_VERSION" | tr -d '.')
                INCOMING_VERSION_NUMBER_UNQUOTED=$(echo  "$INCOMING_VERSION_NUMBER" | tr -d '"')
                if [ "$PACKAGE_VERSION_NUMBER" -lt "$INCOMING_VERSION_NUMBER_UNQUOTED" ]; then
                        PUBLISH_FLAG=true   
                fi
        fi
        if [[ "$PUBLISH_FLAG" == true ]]; then
                echo "Publishing"
                
                export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain ${DOMAIN_NAME} --domain-owner ${ACCOUNT_NUMBER} --region ${AWS_REGION} --query authorizationToken --output text`
                cd ./static_code_analysis_report
                cat > .npmrc <<EOF
registry=https://${DOMAIN_NAME}-${ACCOUNT_NUMBER}.d.codeartifact.${AWS_REGION}.amazonaws.com/npm/${REPOSITORY_NAME}/
//${DOMAIN_NAME}-${ACCOUNT_NUMBER}.d.codeartifact.${AWS_REGION}.amazonaws.com/npm/${REPOSITORY_NAME}/:always-auth=true
//${DOMAIN_NAME}-${ACCOUNT_NUMBER}.d.codeartifact.${AWS_REGION}.amazonaws.com/npm/${REPOSITORY_NAME}/:_authToken=${CODEARTIFACT_AUTH_TOKEN}
EOF
                npm publish
        else
                echo "Not publishing"
        fi
else
        echo "issue in repository or domain"
fi