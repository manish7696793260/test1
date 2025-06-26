{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucketMultipartUploads",
                "s3:AbortMultipartUpload",
                "s3:ListMultipartUploadParts",
                "s3:PutBucketNotification"
            ],
            "Resource": [
                "arn:aws:s3:::${country_environment}-${deployment_region}-common-s3",
                "arn:aws:s3:::${country_environment}-${deployment_region}-common-s3/*"
            ]
        }
    ]
}