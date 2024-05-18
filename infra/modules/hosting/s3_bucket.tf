resource "aws_s3_bucket" "app-hosting" {
  bucket = var.domain_name

  tags = var.tags
}

resource "aws_s3_object" "source-files" {
  for_each = fileset("${path.module}/../../../apps/web/dist", "**/*")
  bucket = var.domain_name
  key = each.value
  source = "${path.module}/../../../apps/web/dist/${each.value}"
  etag = filemd5("${path.module}/../../../apps/web/dist/${each.value}")
  content_type = each.value
  acl = "public-read"

  tags = var.tags
}