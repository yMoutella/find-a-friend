import tsconfigpaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tsconfigpaths()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
