output "aws_region" {
    description = "The region the app is deployed in"
    value       = var.region
}

output "cognito_user_pool_arn" {
    value       = module.auth.cognito_user_pool.arn
    description = "The ARN of the Cognito user pool to use for authentication"
}

output "cognito_user_pool_id" {
    description = "The ID of the Cognito user pool to use for authentication"
    value       = module.auth.cognito_user_pool.id
}

output "cognito_user_pool_username_attributes" {
    description = "The user attributes that are used as username"
    value       = module.auth.cognito_user_pool.username_attributes
}

output "cognito_user_pool_password_policy" {
    description = "The password policy of the Cognito user pool"
    value       = module.auth.cognito_user_pool.password_policy
}

output "cognito_user_pool_client_id" {
    description = "The ID of the Cognito user pool client to use for authentication"
    value       = module.auth.cognito_user_pool_client.id
}