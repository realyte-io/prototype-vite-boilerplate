resource "aws_s3_bucket_cors_configuration" "app-bucket-cors-conf" {
  bucket = aws_s3_bucket.app-hosting.id

  cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    expose_headers  = []
    max_age_seconds = 3000
  }
}