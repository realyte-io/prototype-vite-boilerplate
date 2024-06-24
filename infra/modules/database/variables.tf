variable "aws_region" {
  description = "The AWS region to deploy the resources in"
  type        = string
  default     = "eu-central-1"
}

variable "db_username" {
  description = "The username for the database"
  type        = string
  default     = "masteruser"
}

variable "db_password" {
  description = "The password for the database"
  type        = string
  default     = "4<w534h{T#A_"
}

variable "db_allocated_storage" {
  description = "The allocated storage in GBs"
  type        = number
  default     = 20
}

variable "db_instance_class" {
  description = "The instance class of the RDS instance"
  type        = string
  default     = "db.t4g.micro"
}

variable "application_name" {
  description = "The name of the application"
  default     = "my-app"
}

variable "environment" {
  description = "The environment to deploy to"
  default     = "dev"
}

variable "vpc_id" {
  description = "VPC id"
}

variable "private_subnet_ids" {
  description = "Private subnet ids"
}