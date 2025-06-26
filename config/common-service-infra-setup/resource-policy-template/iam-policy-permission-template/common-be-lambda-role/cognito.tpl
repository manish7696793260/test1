{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "cognito-idp:AdminConfirmSignUp",
            "Resource": "arn:aws:cognito-idp:${region}:${account_id}:userpool/${cognito}"
        }
    ]
}