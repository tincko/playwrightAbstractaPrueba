import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests', // Directory where tests are located
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: 0,
  workers: 1, // Use 1 worker for sequential execution if needed, otherwise undefined for parallel
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'https://www.demoblaze.com',
    trace: 'on-first-retry',
    headless: true, // Running headless for better stability in CI/Agent environment
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

export default config;
