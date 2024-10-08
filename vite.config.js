import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      fs: 'browserify-fs',
      '@data': '../../../backend/data',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://patrimoine-economique-backend.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
});