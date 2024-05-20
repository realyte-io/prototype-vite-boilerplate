terraform {
  required_providers {
    postgresql = {
      source  = "cyrilgdn/postgresql"
      version = "~> 1.14"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "postgresql" {
  host     = aws_db_instance.default.address
  port     = 5432
  database = "postgres"
  username = var.db_username
  password = var.db_password
  sslmode  = "require"
}

resource "aws_security_group" "rds" {
  name_prefix = "rds-sg-"
  description = "Security group for RDS instance"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Erlaubt Zugriff von überall, für Sicherheit sollte dies auf eine spezifische IP-Adresse eingeschränkt werden
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name            = "${var.application_name}-rds-sg"
    ApplicationName = var.application_name
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "${var.application_name}-db-subnet-group"
  subnet_ids = var.private_subnet_ids

  tags = {
    ApplicationName = var.application_name
  }
}

resource "aws_db_instance" "default" {
  identifier              = "${var.application_name}-postgres-instance"
  allocated_storage       = var.db_allocated_storage
  engine                  = "postgres"
  engine_version          = "16.3"
  instance_class          = var.db_instance_class
  publicly_accessible     = true
  skip_final_snapshot     = true
  vpc_security_group_ids  = [aws_security_group.rds.id]
  db_subnet_group_name    = aws_db_subnet_group.main.name
  username                = var.db_username
  password                = var.db_password

  tags = {
    ApplicationName = var.application_name
  }
}

resource "postgresql_database" "application_db" {
  name  = "${var.application_name}_${var.environment}"

  depends_on = [aws_db_instance.default]
}