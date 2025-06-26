#!/bin/bash
DOMAIN_NAME=us-omron-code-artifact
REPOSITORY_NAME=us-omron-common-packages
if [ "$AWS_REGION" == "eu-west-1" ]; then
        REPOSITORY_NAME=eu-omron-common-packages
        DOMAIN_NAME=eu-omron-code-artifact
fi
ACCOUNT_NUMBER=$(echo "$CODEBUILD_BUILD_ARN" | awk -F: '{print $5}')
# AWS CLI command to get CodeArtifact authorization token
export CODEARTIFACT_AUTH_TOKEN=`aws codeartifact get-authorization-token --domain ${DOMAIN_NAME} --domain-owner ${ACCOUNT_NUMBER} --region ${AWS_REGION} --query authorizationToken --output text`

# Check if the command succeeded
if [ $? -ne 0 ]; then
  echo "Failed to obtain authorization token from AWS CodeArtifact"
  exit 1
fi

# Create .npmrc file with dynamic content...
cat > .npmrc <<EOF
registry=https://${DOMAIN_NAME}-${ACCOUNT_NUMBER}.d.codeartifact.${AWS_REGION}.amazonaws.com/npm/${REPOSITORY_NAME}/
//${DOMAIN_NAME}-${ACCOUNT_NUMBER}.d.codeartifact.${AWS_REGION}.amazonaws.com/npm/${REPOSITORY_NAME}/:always-auth=true
//${DOMAIN_NAME}-${ACCOUNT_NUMBER}.d.codeartifact.${AWS_REGION}.amazonaws.com/npm/${REPOSITORY_NAME}/:_authToken=${CODEARTIFACT_AUTH_TOKEN}
EOF

echo ".npmrc file created successfully with authorization token."
