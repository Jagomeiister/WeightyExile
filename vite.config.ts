import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
export default defineConfig({
  plugins: [react()],
  // The base path is set to the repository name for GitHub Pages deployment.
  // Update this if hosting at a custom domain or a different subpath.
  // Ensure the base path matches the repository name exactly.  This is
  // critical for correct asset loading on GitHub Pages, which is
  // case‑sensitive.
  base: '/WeightyExile/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});