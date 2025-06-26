{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": "ses:SendEmail",
            "Resource": "arn:aws:ses:${region}:${account_id}:identity/${ses}"
        }
    ]
}