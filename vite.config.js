export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'] // Example: move common libs to a separate chunk
        }
      }
    }
  }
})
