#!/usr/bin/bash
CODEBUILD_INITIATOR=$1
PROCEED='true'

#setup env variable
if [ ${ENVIRONMENT} == 'beta' ] || [ ${ENVIRONMENT} == 'prd' ] ; then
    PROCEED='false'
fi

echo ${CODEBUILD_INITIATOR}
echo ${ENVIRONMENT}
echo ${COUNTRY_CODE}
echo ${DEPLOYMENT_REGION}
echo ${PROCEED}
echo ${AWS_REGION}

# Save the current IFS value to restore it later
OLD_IFS=$IFS

# Set IFS to "/" for splitting the string
IFS="/"

# Create an array by splitting the string
read -ra parts <<< "$CODEBUILD_INITIATOR"

PIPELINE_NAME=${parts[1]}
echo ${PIPELINE_NAME}

# Restore the original IFS value
IFS=$OLD_IFS

# Declare S3 URL and S3 Path Prefixes
# Note: Below bucket needs to be change once the Devops Infra is created
path_prefix="s3://${ENVIRONMENT}-${COUNTRY_CODE}-operations"
url_prefix="https://${ENVIRONMENT}-${COUNTRY_CODE}-operations.s3.${AWS_REGION}.amazonaws.com"

# Mail Body for Error emails
body="Hi DevOps Team,

Something went wrong while running the Automated Unit Test Cases for following Pipeline of Vitasight Project:

PIPELINE NAME: $PIPELINE_NAME

Details of execution logs can be found on the following Path : 

S3 PATH : <PATH>

ACTION ITEM: Please create an ORM ticket in the current release attaching the log file in the above mentioned S3 Path for the Dev Team to fix the underlying issues.

Thanks"

#proceed to unit testing only if non prod environment
if [[ ${PROCEED} == 'true' ]] ; then
    echo 'running coverage script'
    pwd
    cmd_out=$(npm run sync-service-coverage) && (
        printf "$cmd_out" > npm_coverage_$(date +%Y%m%d%H%M)_success.txt 2> /dev/null ;
        aws s3 cp npm_coverage_* ${path_prefix}/automated-ut-reports/common-sync-service/${PIPELINE_NAME}/success/
    ) || (
        printf "$cmd_out" > npm_coverage_$(date +%Y%m%d%H%M)_error.txt 2> /dev/null;
        s3_output=$(aws s3 cp npm_coverage_* ${path_prefix}/automated-ut-reports/common-sync-service/${PIPELINE_NAME}/error/);
        echo 'S3 upload successful';
        # Get the S3 key from the response of above command
        s3_path=$(awk '{print $NF}' <<< "$s3_output");
        # Update PATH in the email Body
        email_body=$(sed "s|<PATH>|$s3_path|g" <<< "$body")
        echo "$email_body";
        # send Email to DevOps
        aws ses send-email --from "DevOps@firminiq.com" --to "DevOps@firminiq.com" --subject "${ENVIRONMENT^^} Common Sync Service | Automated Test Report Error | ${PIPELINE_NAME}" --text "$email_body";
        echo "Mail sent successfully!! Exiting BUILD phase with status 1"
        exit 1
    )
else
    exit 0
fi
