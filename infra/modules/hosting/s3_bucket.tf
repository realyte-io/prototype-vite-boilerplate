resource "aws_s3_bucket" "app-hosting" {
  bucket = var.domain_name

  tags = var.tags
}