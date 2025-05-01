import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ['e2e', 'e2e/**', 'node_modules', 'dist'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  }
})