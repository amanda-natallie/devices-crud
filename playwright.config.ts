import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'src/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  webServer: {
    command: 'pnpm dev:standalone',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    env: {
      VITE_REST_API_URL: 'http://localhost:7000',
      VITE_USER_NODE_ENV: 'development',
    },
  },
});
