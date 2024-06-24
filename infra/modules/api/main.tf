locals {
  function_name               = "${var.application_name}-${var.environment}"
  function_handler            = "index.handler"
  function_runtime            = "nodejs20.x"
  function_timeout_in_seconds = 8

  function_source_dir = "../apps/api/dist"
}

resource "aws_lambda_function" "function" {
  function_name = local.function_name
  handler       = local.function_handler
  runtime       = local.function_runtime
  timeout       = local.function_timeout_in_seconds

  filename         = "${local.function_source_dir}.zip"
  source_code_hash = data.archive_file.function_zip.output_base64sha256

  role = aws_iam_role.function_role.arn

  environment {
    variables = {
      ENVIRONMENT                 = var.environment
      db_instance_endpoint        = var.db_instance_endpoint
      db_name                     = var.db_name
      cognito_user_pool_client_id = var.cognito_user_pool_client_id
      cognito_user_pool_id        = var.cognito_user_pool_id
      DATABASE_URL                = "postgresql://masteruser:4%3Cw534h%7BT%23A_@boilerplate-postgres-instance.cm6yrsekqavd.eu-central-1.rds.amazonaws.com:5432/boilerplate_dev?schema=public"
    }
  }
}

data "archive_file" "function_zip" {
  source_dir  = local.function_source_dir
  type        = "zip"
  output_path = "${local.function_source_dir}.zip"
}

resource "aws_iam_role" "function_role" {
  name = "${local.function_name}-function-role"

  assume_role_policy = jsonencode({
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy" "function_policy" {
  name   = "${local.function_name}-function-policy"
  role   = aws_iam_role.function_role.id
  policy = jsonencode({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource: "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_api_gateway_rest_api" "lambda_rest_api" {
  name        = "${var.application_name}-${var.environment}"
  description = "REST API for ${var.application_name}-${var.environment}"
}

resource "aws_api_gateway_resource" "graphql" {
  rest_api_id = aws_api_gateway_rest_api.lambda_rest_api.id
  parent_id   = aws_api_gateway_rest_api.lambda_rest_api.root_resource_id
  path_part   = "graphql"
}

resource "aws_api_gateway_method" "get_graphql" {
  rest_api_id   = aws_api_gateway_rest_api.lambda_rest_api.id
  resource_id   = aws_api_gateway_resource.graphql.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "post_graphql" {
  rest_api_id   = aws_api_gateway_rest_api.lambda_rest_api.id
  resource_id   = aws_api_gateway_resource.graphql.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "get_graphql" {
  rest_api_id = aws_api_gateway_rest_api.lambda_rest_api.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.get_graphql.http_method
  type        = "AWS_PROXY"
  integration_http_method = "POST"
  uri         = aws_lambda_function.function.invoke_arn
}

resource "aws_api_gateway_integration" "post_graphql" {
  rest_api_id = aws_api_gateway_rest_api.lambda_rest_api.id
  resource_id = aws_api_gateway_resource.graphql.id
  http_method = aws_api_gateway_method.post_graphql.http_method
  type        = "AWS_PROXY"
  integration_http_method = "POST"
  uri         = aws_lambda_function.function.invoke_arn
}

resource "aws_api_gateway_deployment" "lambda_rest_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.lambda_rest_api.id
  stage_name  = var.environment

  depends_on = [
    aws_api_gateway_integration.get_graphql,
    aws_api_gateway_integration.post_graphql
  ]
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_api_gateway_rest_api.lambda_rest_api.name}"
  retention_in_days = 30
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.function.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.lambda_rest_api.execution_arn}/*/*"
}
