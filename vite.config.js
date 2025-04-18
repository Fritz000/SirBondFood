import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/report.html',
      open: false,
    }),
  ],
  build: {
    // Suppress warning (Vite only)
    chunkSizeWarningLimit: 3000,

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split large vendor libraries
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('@heroicons')) return 'vendor-heroicons';
            if (id.includes('tailwindcss')) return 'vendor-tailwind';
            return 'vendor';
          }

          // Split each page
          if (id.includes('/src/pages/')) {
            const name = id
              .split('/src/pages/')[1]
              .split('/')[0]
              .replace(/\.[jt]sx?$/, '');
            return `page-${name}`;
          }

          // Optional: split components
          if (id.includes('/src/components/')) {
            const name = id
              .split('/src/components/')[1]
              .split('/')[0]
              .replace(/\.[jt]sx?$/, '');
            return `component-${name}`;
          }
        },
      },
    },
  },
});
