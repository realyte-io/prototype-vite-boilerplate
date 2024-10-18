data "aws_caller_identity" "current" {}

resource "aws_cognito_user_pool" "main" {
  name                     = "${var.application_name}-users-${var.environment}"
  auto_verified_attributes = [
    "email"
  ]
  username_attributes = [
    "email"
  ]

  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
    recovery_mechanism {
      name     = "verified_phone_number"
      priority = 2
    }
  }

  email_configuration {
    email_sending_account  = "DEVELOPER"
    from_email_address     = "noreply@${var.domain_name}"
    source_arn             = "arn:aws:ses:eu-central-1:${data.aws_caller_identity.current.account_id}:identity/${aws_ses_domain_identity.this.domain}"
    reply_to_email_address = "support@${var.domain_name}"
  }

  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 7
  }

  schema {
    attribute_data_type      = "String"
    developer_only_attribute = false
    mutable                  = true
    name                     = "email"
    required                 = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }

  schema {
    attribute_data_type = "String"
    name = "family_name"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
      max_length = 50
      min_length = 2
    }
  }

  schema {
    attribute_data_type = "String"
    name = "given_name"
    developer_only_attribute = false
    mutable                  = true
    required                 = true
    string_attribute_constraints {
      max_length = 50
      min_length = 2
    }
  }

  schema {
    attribute_data_type = "String"
    name = "companyId"
    developer_only_attribute = false
    mutable                  = true
    required                 = false
    string_attribute_constraints {
      max_length = 50
      min_length = 2
    }
  }

  username_configuration {
    case_sensitive = false
  }

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_message        = "Your verification code is {####}"
    email_subject        = "Your verification code"
  }

  admin_create_user_config {
    invite_message_template {
      email_subject = "Du wurdest zu ${var.application_name} hinzugefügt"
      email_message = "Du wurdest mit dieser E-Mail Adresse: {username} eingeladen. Bitte klicke auf den Link https://${var.domain_name}/signup/company und verwende das temporäre Kennwort für die erste Anmeldung: {####}"
      sms_message = "Du wurdest mit dieser E-Mail Adresse: {username} eingeladen. Bitte verwende das temporäre Kennwort für die erste Anmeldung: {####}"
    }
  }

  tags = var.tags
}

resource "aws_cognito_user_pool_client" "app-client" {
  name                  = "${var.application_name}-app-client-${var.environment}"
  user_pool_id          = aws_cognito_user_pool.main.id
  access_token_validity = 24
  id_token_validity     = 24
  generate_secret       = false
    explicit_auth_flows = [
        "ALLOW_REFRESH_TOKEN_AUTH",
        "ALLOW_CUSTOM_AUTH",
        "ALLOW_USER_SRP_AUTH",
        "ALLOW_USER_PASSWORD_AUTH"
    ]
}