import { defineConfig, type UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { InlineConfig } from 'vitest';

import react from '@vitejs/plugin-react-swc';

const exclusions = [
  '**/main.tsx',
  '**/index.ts',
  '**/utils/test/*.tsx',
  '**/utils/lib/*.ts',
  '**/components/ui/*.tsx',
  '**/use-filter.tsx',
  '**/*.types.ts',
  '**/*.styles.ts',
  '**/*.config.ts',
  '**/config/**/*.ts',
  '**/*.d.ts',
];

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    root: './src',
    include: ['**/*.test.{ts,tsx}'],

    exclude: exclusions,
    coverage: {
      reportOnFailure: true,
      all: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: '../coverage-report',
      include: [
        '**/use-*.ts',
        '**/use-*.tsx',
        '**/components/**/*.ts',
        '**/hooks/**/*.ts',
        '**/utils/**/*.ts',
        '**/store/**/*.ts',
      ],
      exclude: exclusions,
      enabled: true,
      thresholds: {
        perFile: true,
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
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
