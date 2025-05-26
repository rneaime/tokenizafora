import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1024,
    assets: [
      {
        type: 'js',
        mimeType: 'application/javascript',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  server: {
    port: 3001,
    proxy: {
      '/': 'http://localhost:3001'
    }
  }
});