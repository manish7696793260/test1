#!/bin/bash
set -x
wget https://releases.hashicorp.com/terraform/1.11.2/terraform_1.11.2_linux_amd64.zip
unzip terraform_1.11.2_linux_amd64.zip
mv terraform /usr/local/bin/
unzip terraform10.zip
cd terraform10 

terraform init -backend-config="bucket=bucketforerraform" -backend-config="key=usw2-common-tf/terraform.tfstate" -backend-config="region=us-west-2"
terraform apply -var="pipeline_region=$PIPELINE_REGION" -var="environment_variable=$ENVIRONMENT_VARIABLE" -var="pipeline_name=$PIPELINE_NAME" -var="codestar_connection_name=$CODESTAR_CONNECTION_NAME" -var="region=$REGION" -var="deploymentregion=$DEPLOYMENTREGION" -var="tf_var=$TF_VAR" -var="countryenv=$COUNTRYENV" -var="state_file_path=$STATE_FILE_PATH" -var="state_file_bucket=usnp-usw2-terraform-statefile-bucket" -var="db_table=$DB_TABLE" --auto-approve
