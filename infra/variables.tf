variable "region" {
    description = "AWS region"
    type        = string
    default     = "eu-central-1"
}

variable "aws_profile" {
    description = "Name of your AWS profile"
    type        = string
    default     = "default"
}

variable "application_name" {
    description = "Name of the application"
    type        = string
    default     = "boilerplate"
}

variable "domain" {
    description = "Domain name"
    type        = string
    default     = "realyte.digital"
}

variable "none_dev_stages" {
    description = "List of terraform workspaces that should be treated as production or production-like stages."
    type        = list(string)
    default     = ["staging", "prod"]
}

variable "route53_zone_id" {
    description = "The ID of the existing Route 53 Hosted Zone"
    type        = string
    default     = "Z0564691IMEN8866O4W"
}