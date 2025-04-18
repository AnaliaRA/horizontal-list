/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/public/**',
        '**/vite.config.ts',
        '**/vitest.setup.ts',
        '**/postcss.config.*',
        '**/tailwind.config.*',
        '**/eslint.config.*',
        '**/tsconfig.*',
        '**/index.html',
        '**/.vscode/**',
        '**/.gitignore',
        '**/README.md',
        '**/vite-env.d.ts',
        '**/vitest.d.ts',
        '**/main.tsx',
        '**/*.d.ts'
      ],
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['text', 'json', 'html'],
      all: true
    }
  },
})
