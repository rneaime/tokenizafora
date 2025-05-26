import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';
  
  return {
    plugins: [
      react({
        // Ensure React refresh is enabled in development
        fastRefresh: isDevelopment,
        // Enable JSX in .js files
        include: '**/*.{jsx,js,tsx,ts}',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    esbuild: {
      // Enable JSX syntax in all JS files
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
      // Ensure JSX is preserved
      jsx: 'automatic',
      // Allow JSX in .js files
      jsxInject: `import React from 'react'`,
    },
    build: {
      outDir: 'dist',
      sourcemap: isDevelopment,
      // Minify code for production, but not in development
      minify: isDevelopment ? false : 'terser',
      target: 'es2018',
      // Improve chunking for better loading performance
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['axios'],
          },
        },
      },
    },
    optimizeDeps: {
      // Force include problematic dependencies
      include: ['react', 'react-dom', 'react-router-dom'],
      // Ensure JSX is processed in dependencies
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
          '.ts': 'tsx',
        },
        jsx: 'automatic',
      }
    },
    server: {
      port: 3000,
      strictPort: true,
      // Improved proxy settings
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      // Enable CORS
      cors: true,
      // Watch for file changes
      watch: {
        usePolling: true,
      },
      // Hot module replacement
      hmr: {
        overlay: true,
      },
    },
    // Use React runtime
    jsx: 'react-jsx',
    // Define global constants for build
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
  };
});

