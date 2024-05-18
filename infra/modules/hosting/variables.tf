variable "domain_name" {
  description = "Domain name for CloudFront"
  type        = string
  default     = null
}

variable "application_name" {
  description = "Name of the application"
  type        = string
  default     = null
}

variable "route53_zone_id" {
  description = "The ID of the existing Route 53 Hosted Zone"
  type        = string
}

variable "tags" {
  description = "A map of tags to add to all resources"
  type        = map(string)
}