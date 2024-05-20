output "db_instance_endpoint" {
  description = "The connection endpoint for the RDS instance"
  value       = aws_db_instance.default.endpoint
}

output "db_name" {
  description = "The name of the database"
  value = postgresql_database.application_db.id
}