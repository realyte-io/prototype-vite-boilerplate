provider "aws" {
    alias   = "default"
    profile = var.aws_profile
    region  = var.region
}

provider "aws" {
    alias   = "us-east-1"
    profile = var.aws_profile
    region  = "us-east-1"
}

locals {
    environment  = terraform.workspace == "default" ? "production" : terraform.workspace
    domain_name  = terraform.workspace == "default" ? "${var.application_name}.realyte.digital" : "${terraform.workspace}.${var.application_name}.realyte.digital"
    tags = {
        ApplicationName = var.application_name
        Environment     = local.environment
    }
}

module "auth" {
    source = "./modules/auth"
    //Variables
    region                      = var.region
    application_name            = var.application_name
    environment                 = local.environment
    domain_name                 = local.domain_name
    route53_zone_id             = var.route53_zone_id
    tags                        = local.tags
}

module "hosting" {
    source = "./modules/hosting"
    // Variables
    application_name            = var.application_name
    domain_name                 = local.domain_name
    route53_zone_id             = var.route53_zone_id
    tags                        = local.tags
}

module "vpc" {
    source = "./modules/vpc"
    // Variables
    application_name            = var.application_name
    environment                 = local.environment
}

module "database" {
    source = "./modules/database"
    // Variables
    application_name            = var.application_name
    environment                 = local.environment
    vpc_id                      = module.vpc.vpc_id
    private_subnet_ids          = module.vpc.private_subnet_ids
}

module "api" {
    source = "./modules/api"
    // Variables
    application_name            = var.application_name
    environment                 = local.environment
    cognito_user_pool_client_id = module.auth.cognito_user_pool_client.id
    cognito_user_pool_id        = module.auth.cognito_user_pool.id
    db_instance_endpoint        = module.database.db_instance_endpoint
    db_name                     = module.database.db_name
}