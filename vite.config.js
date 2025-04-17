import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default defineConfig({
  plugins: [
    react(),
    chunkSplitPlugin({
      strategy: 'all-in-one', // Customize strategy
    }),
  ],
  build: {
    chunkSizeWarningLimit: 3000,
  },
});