output "cognito_user_pool" {
  description = "The Cognito User Pool"
  value       = aws_cognito_user_pool.main
}

output "cognito_user_pool_client" {
  description = "The Cognito User Pool Client"
  value       = aws_cognito_user_pool_client.app-client
}
