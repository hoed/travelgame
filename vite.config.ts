import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        host: true,
        // @ts-ignore
        allowedHosts: process.env.TEMPO === "true" ? true : undefined
    },
    build: {
        outDir: 'dist',
        sourcemap: false
    }
})
