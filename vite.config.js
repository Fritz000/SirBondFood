import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/report.html',
      open: true,
    }),
  ],
  build: {
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // 💡 This splits each page into its own chunk
          if (id.includes('/src/pages/')) {
            const name = id
              .split('/src/pages/')[1]
              .split('/')[0]
              .replace(/\.[jt]sx?$/, ''); // remove .js or .jsx
            return `page-${name}`;
          }
        },
      },
    },
  },
});
