#!/usr/bin/bash
CODEBUILD_INITIATOR=$1
EX_ENV='prd'
PROCEED='false'
REGION='us'

#setup env variable
if [[ ${CODEBUILD_INITIATOR} == 'codepipeline/usdev-common-auth-service-pipeline' ]] ; then
    EX_ENV='dev'
    PROCEED='true'
elif [[ ${CODEBUILD_INITIATOR} == 'codepipeline/usqa-common-auth-service-pipeline' ]] ; then
    EX_ENV='qa'
    PROCEED='true'
elif [[ ${CODEBUILD_INITIATOR} == 'codepipeline/usstg-common-auth-service-pipeline' ]] ; then
    EX_ENV='stg'
    PROCEED='true'
fi

echo ${CODEBUILD_INITIATOR}
echo ${EX_ENV}
echo ${PROCEED}

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
path_prefix="s3://${EX_ENV}-us-operations"
url_prefix="https://${EX_ENV}-us-operations.s3.us-west-2.amazonaws.com"

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
    cmd_out=$(npm run auth-service-coverage) && (
        printf "$cmd_out" > npm_coverage_$(date +%Y%m%d%H%M)_success.txt 2> /dev/null ;
        aws s3 cp npm_coverage_* ${path_prefix}/automated-ut-reports/common-auth-service/${PIPELINE_NAME}/success/
    ) || (
        printf "$cmd_out" > npm_coverage_$(date +%Y%m%d%H%M)_error.txt 2> /dev/null;
        s3_output=$(aws s3 cp npm_coverage_* ${path_prefix}/automated-ut-reports/common-auth-service/${PIPELINE_NAME}/error/);
        echo 'S3 upload successful';
        # Get the S3 key from the response of above command
        s3_path=$(awk '{print $NF}' <<< "$s3_output");
        # Update PATH in the email Body
        email_body=$(sed "s|<PATH>|$s3_path|g" <<< "$body")
        echo "$email_body";
        # send Email to DevOps
        aws ses send-email --from "DevOps@firminiq.com" --to "DevOps@firminiq.com" --subject "${EX_ENV^^} Common Auth Service | Automated Test Report Error | ${PIPELINE_NAME}" --text "$email_body";
        echo "Mail sent successfully!! Exiting BUILD phase with status 1"
        exit 1
    )
else
    exit 0
fi
