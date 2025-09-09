#!/bin/bash
sudo dnf install -y dnf-plugins-core
sudo dnf config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
sudo dnf install -y terraform
terraform init
terraform apply -var="pipeline_region=$PIPELINE_REGION" -var="environment_variable=$ENVIRONMENT_VARIABLE" -var="pipeline_name=$PIPELINE_NAME" -var="codestar_connection_name=$CODESTAR_CONNECTION_NAME" -var="region=$REGION" -var="deploymentregion=$DEPLOYMENTREGION" -var="tf_var=$TF_VAR" -var="countryenv=$COUNTRYENV" -var="state_file_path=$STATE_FILE_PATH" -var="state_file_bucket=usnp-usw2-terraform-statefile-bucket" -var="db_table=$DB_TABLE"
