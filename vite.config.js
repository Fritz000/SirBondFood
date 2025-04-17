import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import chunkSplitPlugin from 'vite-plugin-chunk-split';

export default defineConfig({
  plugins: [
    react(),
    chunkSplitPlugin({
      strategy: 'all-in-one', // Customize strategy, or try 'single-vendor'
    }),
  ],
  build: {
    chunkSizeWarningLimit: 3000, // 3MB
  },
});