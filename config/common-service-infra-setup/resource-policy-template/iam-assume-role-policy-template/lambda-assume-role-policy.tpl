{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": ${jsonencode(services)}
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}