{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction"
                ],
            "Resource": "arn:aws:lambda:${region}:${account_id}:function:${country_environment}-${deployment_region}-common-sync-*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": [
                "lambda:AddPermission"
                ],
            "Resource": "arn:aws:lambda:${region}:${account_id}:function:${country_environment}-${deployment_region}-common-static-code-trigger-lambda"
        }
    ]
}
