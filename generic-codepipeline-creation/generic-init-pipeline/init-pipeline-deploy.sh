#!/bin/bash

#variables

source variables.txt

AppName=$env-$project
CodeBuildImage=aws/codebuild/standard:7.0                                          #codebuild image, check always, should be latest
GitHubToken=xyzfake8ye54d273dr2fye6f242xe0
GitHubUser=manish2709
SAMInputFile=${SAMINPUT}
SAMOutputFile=${SAMOUTPUT}



stackname=$env-$project-pipeline
bucket_name=usnp-common-templates
eu_bucket_name=eunp-common-templates
euprd_bucket_name=euprd-common-templates
usprd_bucket_name=usprd-common-templates

 if [ "$env" = "usdev" ];then
    env2=dev
    env3=us-dev
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$bucket_name/$env-$project-pipeline/
    maintemplate=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml
 elif [ "$env" = "usqa" ];then
    env2=qa
    env3=us-qa
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$bucket_name/$env-$project-pipeline/
    maintemplate=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml
 elif [ "$env" = "usstg" ];then
    env2=stg
    env3=us-stg
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$bucket_name/$env-$project-pipeline/
    maintemplate=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml

 elif [ "$env" = "usprd" ];then
    env2=prd
    env3=us-prd
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$usprd_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$usprd_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$usprd_bucket_name/$env-$project-pipeline/
    maintemplate=https://$usprd_bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$usprd_bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$usprd_bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml
 elif [ "$env" = "usbeta" ];then
    env2=beta
    env3=us-beta
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$bucket_name/$env-$project-pipeline/
    maintemplate=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$bucket_name.s3.us-west-2.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml
 elif [ "$env" = "eudev" ];then
    env2=dev
    env3=eu-dev
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    maintemplate=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml
 elif [ "$env" = "euqa" ];then
    env2=qa
    env3=eu-qa
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    maintemplate=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml
 elif [ "$env" = "eustg" ];then
    env2=stg
    env3=eu-stg
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    maintemplate=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml

 elif [ "$env" = "euprd" ];then
    env2=prd
    env3=eu-prd
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$euprd_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$euprd_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$euprd_bucket_name/$env-$project-pipeline/
    maintemplate=https://$euprd_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$euprd_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$euprd_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml
 elif [ "$env" = "eubeta" ];then
    env2=beta
    env3=eu-beta
    sed -i "s/regionenv/$env/g" templates/default-init-pipeline-roles.yaml && sed -i "s/regionenv/$env/g" templates/default-init-pipeline.yaml
    sed -i "s/environment/$env2/g" templates/default-init-pipeline-roles.yaml && sed -i "s/environment/$env2/g" templates/default-init-pipeline.yaml
    sed -i "s/region-env/$env3/g" templates/default-init-pipeline-roles.yaml && sed -i "s/region-env/$env3/g" templates/default-init-pipeline.yaml
    aws s3 cp templates/default-init-pipeline-main.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline-roles.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    aws s3 cp templates/default-init-pipeline.yaml s3://$eu_bucket_name/$env-$project-pipeline/
    maintemplate=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-main.yaml
    CodePipelineTemplateURL=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline.yaml
    RolesTemplateURL=https://$eu_bucket_name.s3.eu-west-1.amazonaws.com/$env-$project-pipeline/default-init-pipeline-roles.yaml

 fi

aws cloudformation create-stack \
    --stack-name $stackname \
    --template-url $maintemplate\
    --parameters ParameterKey=AppName,ParameterValue=$AppName  ParameterKey=BuildSpecFileNameForAPI,ParameterValue=$BuildSpecFileNameForAPI ParameterKey=CodeBuildImage,ParameterValue=$CodeBuildImage  ParameterKey=CodePipelineTemplateURL,ParameterValue=$CodePipelineTemplateURL  ParameterKey=GitHubRepoBranch,ParameterValue=$GitHubRepoBranch ParameterKey=GitHubRepoName,ParameterValue=$GitHubRepoName ParameterKey=GitHubToken,ParameterValue=$GitHubToken ParameterKey=GitHubUser,ParameterValue=$GitHubUser ParameterKey=RolesTemplateURL,ParameterValue=$RolesTemplateURL ParameterKey=ParametersFile,ParameterValue=$ParametersFile ParameterKey=SAMInputFile,ParameterValue=$SAMInputFile ParameterKey=SAMOutputFile,ParameterValue=$SAMOutputFile \
    --capabilities CAPABILITY_NAMED_IAM --tags Key=ohi:name,Value=$ohiname Key=ohi:project,Value=$ohiproject Key=ohi:application,Value=$ohiapplication Key=ohi:module,Value=$ohimodule Key=ohi:application-role,Value=$ohiapplicationrole Key=ohi:environment,Value=$ohienvironment
