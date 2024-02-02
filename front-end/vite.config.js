import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Add this line to enable sourcemaps
    target: 'esnext',
  },
  base: '/',
  assetsDir: 'assets',
})
