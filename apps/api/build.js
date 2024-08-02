// eslint-disable-next-line @typescript-eslint/no-var-requires
const { build } = require('esbuild')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { copyFileSync, mkdirSync, existsSync } = require('fs')

// Definiere den Pfad zur Prisma Query Engine
const queryEnginePath = resolve(
    __dirname,
    '../../node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node',
)
const outputDir = resolve(__dirname, 'dist')
const outputQueryEnginePath = resolve(
    outputDir,
    'node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node',
)

// Prüfe, ob die Query Engine existiert
if (!existsSync(queryEnginePath)) {
    console.error('Prisma Query Engine nicht gefunden:', queryEnginePath)
    process.exit(1)
}

// Stelle sicher, dass das Ausgabe-Verzeichnis existiert
mkdirSync(resolve(outputDir, 'node_modules/.prisma/client'), {
    recursive: true,
})

// Kopiere die Prisma Query Engine in das Ausgabe-Verzeichnis
copyFileSync(queryEnginePath, outputQueryEnginePath)

build({
    entryPoints: ['./src/index.ts'], // Passe dies an den Einstiegspunkt deiner App an
    bundle: true,
    platform: 'node',
    target: 'node20', // Passe dies an die Node.js-Version von AWS Lambda an
    outfile: './dist/index.js',
    external: ['@prisma/client', 'libquery_engine-rhel-openssl-3.0.x.so.node'],
}).catch(() => process.exit(1))
