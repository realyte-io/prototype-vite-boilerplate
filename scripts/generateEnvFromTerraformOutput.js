const fs = require('fs');
const path = require('path');

// Pfad zur terraform_outputs.json Datei
const terraformOutputsPath = path.join(__dirname, '..', 'infra', 'terraform_outputs.json');

// Pfad zur .env Datei
const envFilePath = path.join(__dirname, '..', 'apps', 'web', '.env');

// Funktion zum Erstellen der .env Datei
function generateEnvFile() {
    try {
        const data = fs.readFileSync(terraformOutputsPath, 'utf8');
        const outputs = JSON.parse(data);

        let envContent = '';
        for (const key in outputs) {
            if (outputs.hasOwnProperty(key) && outputs[key].value) {
                const envKey = key.toUpperCase();
                const envValue = outputs[key].value;
                envContent += `${envKey}=${envValue}\n`;
            }
        }

        fs.writeFileSync(envFilePath, envContent);
        console.log(`.env file has been generated at ${envFilePath}`);
    } catch (err) {
        console.error('Error generating .env file:', err);
    }
}

// Aufruf der Funktion zur Erstellung der .env Datei
generateEnvFile();
