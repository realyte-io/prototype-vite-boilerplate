variable "region" {
    description = "The region to deploy to"
    default     = "eu-central-1"
}

variable "environment" {
    description = "The environment to deploy to"
    default     = "develop"
}

variable "application_name" {
    description = "The name of the application"
    default     = "my-app"
}

variable "domain_name" {
    description = "The domain name for the SES Email service for  cognito user pool"
    type        = string
}

variable "route53_zone_id" {
    description = "The ID of the existing Route 53 Hosted Zone"
    type        = string
}

variable "tags" {
    description = "A map of tags to add to all resources"
    type        = map(string)
}