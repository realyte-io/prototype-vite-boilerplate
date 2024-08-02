# Boilerplate

### Create a new Repository from template and set up new project

- Create a new Repo in  Github based on a template
- add actions secrets
  - AWS_ACCESS_KEY_ID
  - AWS_SECRET_ACCESS_KEY
  - NODE_AUTH_TOKEN
- Change package.json data
- `npm install`
- `npm run build`
- `infra/variables.tf` => change application name
- `infra/terraform.tf` => change state key
- `terraform init -reconfigure`
- `terraform workspace new dev`
- `terraform apply` => 2 times
- `infra/api/main.tf` => change postgres endpoint url
- `terraform output > ../apps/web/.env`
- `terraform output > ../apps/api/.env`
- Add `DATABASE_URL` to api/.env
- delete all node_modules folder
- `npm install`
- `npm run build`
- `aws s3 sync ../apps/web/dist s3://DOMAIN_ENV --delete --acl public-read`


api env IS_LOCAL=true

npx prisma migrate dev --name init
npx prisma generate