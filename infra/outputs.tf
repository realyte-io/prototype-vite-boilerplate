output "aws_region" {
    description = "The region the app is deployed in"
    value       = var.region
}

output "cognito_user_pool_id" {
    description = "The ID of the Cognito user pool to use for authentication"
    value       = module.auth.cognito_user_pool.id
}

output "cognito_user_pool_client_id" {
    description = "The ID of the Cognito user pool client to use for authentication"
    value       = module.auth.cognito_user_pool_client.id
}

output "domain_name" {
    description = "The value of the domain"
    value = local.domain_name
}

output "db_instance_endpoint" {
    description = "The connection endpoint for the RDS instance"
    value       = module.database.db_instance_endpoint
}

output "db_name" {
    description = "The name of the database"
    value = module.database.db_name
}

output "graphql_api_url" {
    description = "The graphql api endpoint"
    value       = module.api.graphql_api_url
}