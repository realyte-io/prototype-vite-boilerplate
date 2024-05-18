resource "aws_s3_bucket_policy" "app-hosting-cloudfront-policy" {
  bucket = aws_s3_bucket.app-hosting.id
  policy = jsonencode({
    "Version": "2008-10-17",
    "Id": "PolicyForCloudFrontPrivateContentAppHosting",
    "Statement": [
      {
        "Sid": "AllowCloudFrontServicePrincipal",
        "Effect": "Allow",
        "Principal": {
          "Service": "cloudfront.amazonaws.com"
        },
        "Action": "s3:GetObject",
        "Resource": "${aws_s3_bucket.app-hosting.arn}/*",
        "Condition": {
          "StringEquals": {
            "AWS:SourceArn": aws_cloudfront_distribution.app-distribution.arn
          }
        }
      }
    ]
  })
}
