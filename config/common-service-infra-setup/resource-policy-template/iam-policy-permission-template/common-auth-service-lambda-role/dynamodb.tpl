{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "dynamodb:BatchGetItem",
                "dynamodb:BatchWriteItem",
                "dynamodb:PutItem",
                "dynamodb:GetItem",
                "dynamodb:Query",
                "dynamodb:UpdateItem",
                "dynamodb:GetRecords"
            ],
            "Resource": [
                "arn:aws:dynamodb:${region}:${account_id}:table/${environment}_global_ofc_mobile",
                "arn:aws:dynamodb:${region}:${account_id}:table/${environment}_global_ofc_master",
                "arn:aws:dynamodb:${region}:${account_id}:table/${environment}_global_bp_readings",
                "arn:aws:dynamodb:${region}:${account_id}:table/${environment}_global_non_bp_readings"
            ]
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "dynamodb:ListTables",
            "Resource": "*"
        }
    ]
}