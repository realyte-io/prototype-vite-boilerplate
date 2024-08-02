import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default ({ mode }) => {
    // Load app-level env vars to node-level env vars.
    const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

    return defineConfig({
        plugins: [react(), svgr()],
        define: {
            'process.env': env,
        },
        resolve: {
            alias: {
                '.prisma/client/index-browser':
                    '../../node_modules/.prisma/client/index-browser.js',
            },
        },
    })
}
