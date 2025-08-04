#!/bin/bash
#variables

source variables.txt
# Check if the application already exists
if aws deploy list-applications | grep -q "\"$ApplicationName\""; then
  echo "Application $ApplicationName already exists."
else
  echo "Creating application $ApplicationName..."
  aws deploy create-application --application-name $ApplicationName 
fi


# Check if the deployment group already exists
if aws deploy list-deployment-groups --application-name $ApplicationName | grep -q "\"$DeploymentGroupName\""; then
  echo "Deployment group $DeploymentGroupName already exists in application $ApplicationName."
else
  echo "Creating deployment group $DeploymentGroupName in application $ApplicationName..."
  aws deploy create-deployment-group --application-name $ApplicationName --ec2-tag-filters Key=Name,Type=KEY_AND_VALUE,Value=$ec2server --deployment-group-name $DeploymentGroupName --service-role-arn $deploygrprole
fi
