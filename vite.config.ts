import { defineConfig, type UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { InlineConfig } from 'vitest';

import react from '@vitejs/plugin-react-swc';

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    root: './src',
    include: ['**/*.test.{ts,tsx}'],

    exclude: [
      '**/__tests__/**/*',
      '**/index.ts',
      '**/utils/test/*.tsx',
      '**/*.styles.ts',
      '**/*.config.ts',
      '**/config/**/*.ts',
      '**/*.d.ts',
    ],
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: '../coverage-report',
      exclude: ['**/main.tsx', '**/utils/test/*.tsx', '**/index.ts'],
      enabled: true,
      thresholds: {
        perFile: true,
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    manifest: true,
    minify: true,
  },
};
export default defineConfig(config);
