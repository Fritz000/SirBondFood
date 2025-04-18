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
    chunkSizeWarningLimit: 2500, // just for local dev warning
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split node_modules packages by group or library
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('@heroicons')) return 'vendor-heroicons';
            if (id.includes('tailwindcss')) return 'vendor-tailwind';
            return 'vendor'; // fallback chunk
          }

          // Split each page into a separate chunk
          if (id.includes('/src/pages/')) {
            const name = id
              .split('/src/pages/')[1]
              .split('/')[0]
              .replace(/\.[jt]sx?$/, '');
            return `page-${name}`;
          }

          // Optionally split components or large UI libraries
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
