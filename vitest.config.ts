/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    includeSource: ['./**/*.{ts,js}'],
    watch: true,
    testTimeout: 30000,
    coverage: ['test', 'html'],
  },
})
