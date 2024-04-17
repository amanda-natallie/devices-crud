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
    testTransformMode: {
      web: ['.*\\.[tj]sx?$'],
    },
    root: './src',
    include: ['**/*.{test,spec}.{ts,tsx}'],

    exclude: [
      '**/__tests__/**/*',
      '**/tests/helpers.tsx',
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
      exclude: ['**/main.tsx', '**/tests/helpers.tsx'],
      enabled: true,
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
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
