import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      fs: 'browserify-fs',
      '@data': '../../../data',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://patrimoine-economique-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  }
});