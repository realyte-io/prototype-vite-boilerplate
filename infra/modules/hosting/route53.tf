resource "aws_route53_record" "root_domain" {
  zone_id = var.route53_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.app-distribution.domain_name
    zone_id                = aws_cloudfront_distribution.app-distribution.hosted_zone_id
    evaluate_target_health = false
  }
}