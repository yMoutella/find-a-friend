import tsconfigpaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigpaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/usecases',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment: './prisma/environment/prisma-test-environment.ts',
        },
      },
    ],
  },
})
