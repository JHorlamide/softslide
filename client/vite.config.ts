import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["apexcharts", "molstar"],
  },
  server: {
    port: 3000,

    proxy: {
      "/api": {
        target: "http://localhost:7073",
        changeOrigin: true,
        secure: false
      }
    },
  },
  build: {
    outDir: "build",
    assetsDir: "assets",
    emptyOutDir: true
  }
})
