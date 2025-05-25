import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  server: {
    port: 3001,
    proxy: {
      '/src': 'http://localhost:3001/src'
    }
  }
});