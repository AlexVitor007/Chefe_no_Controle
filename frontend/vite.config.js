import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    root: process.cwd(),
    build: {
      outDir: path.resolve(__dirname, '../backend/frontend_build'),
      emptyOutDir: true,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html')
      }
    },
    server: {
      port: 5173,
      strictPort: true
    }
  }
})