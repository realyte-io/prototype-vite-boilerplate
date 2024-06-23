variable "environment" {
  description = "The environment to deploy to"
  default     = "develop"
}

variable "application_name" {
  description = "The name of the application"
  default     = "my-app"
}

variable "cognito_user_pool_client_id" {
  description = "The cognito user pool client id"
  default     = ""
}

variable "cognito_user_pool_id" {
  description = "The cognito user pool id"
  default     = ""
}

variable "db_instance_endpoint" {
  description = "The instance endpoint of the database"
  default     = ""
}

variable "db_name" {
  description = "The name of the db"
  default     = ""
}