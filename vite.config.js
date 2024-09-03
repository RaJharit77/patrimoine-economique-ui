import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      fs: 'browserify-fs',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://patrimoine-economique-a47v.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  root: './ui',
  build: {
    outDir: 'dist',
  }
});
