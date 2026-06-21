import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react(), imagetools()],
  // Lightning CSS minifier corrupts rgba() values in :global() selectors
  build: { cssMinify: false },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
