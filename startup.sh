#!/bin/bash

# Im Root-Verzeichnis npm dependencies installieren
npm install

# In /apps/api Verzeichnis wechseln und prisma generate ausführen
cd apps/api || exit
npx prisma generate

# Zurück ins Root-Verzeichnis und npm dependencies installieren sowie build ausführen
cd ../.. || exit
npm install
npm run build

# In /infra Verzeichnis wechseln und terraform initialisieren und konfigurieren
cd infra || exit
terraform init -reconfigure

# Einen neuen terraform workspace 'dev' erstellen
terraform workspace new dev

# Terraform Konfiguration zweimal anwenden
terraform apply -auto-approve
terraform apply -auto-approve

# Postgres endpoint URL in infra/api/main.tf ändern
# (Du musst diesen Schritt entsprechend deiner Anforderungen anpassen)
sed -i 's/OLD_POSTGRES_URL/NEW_POSTGRES_URL/g' api/main.tf

# Terraform Ausgaben in .env Dateien schreiben
terraform output > ../apps/web/.env
terraform output > ../apps/api/.env

# DATABASE_URL zur api/.env hinzufügen
echo "DATABASE_URL=$(terraform output -raw postgres_endpoint)" >> ../apps/api/.env

# In das Root-Verzeichnis wechseln und alle node_modules Ordner löschen
cd ..
rm -rf node_modules apps/api/node_modules apps/web/node_modules

# npm dependencies im Root-Verzeichnis installieren
npm install

# Das Projekt im Root-Verzeichnis bauen
npm run build

# Den Build-Output mit AWS S3 synchronisieren
aws s3 sync apps/web/dist s3://DOMAIN_ENV --delete --acl public-read
