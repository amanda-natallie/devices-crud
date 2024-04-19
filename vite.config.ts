import { defineConfig, type UserConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { InlineConfig } from 'vitest';

import react from '@vitejs/plugin-react-swc';

const exclusions = [
  '**/main.tsx',
  '**/index.ts',
  '**/utils/test/*.tsx',
  '**/store/**/*.ts',
  '**/ui/sonner.tsx',
  '**/**/skeleton.tsx',
  '**/**/home.tsx',
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
      all: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: '../coverage-report',
      exclude: exclusions,
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
