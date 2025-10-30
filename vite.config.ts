import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
export default defineConfig({
  plugins: [react()],
  // The base path is set to the repository name for GitHub Pages deployment.
  // Update this if hosting at a custom domain or a different subpath.
  base: '/weightexile/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});