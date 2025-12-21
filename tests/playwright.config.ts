import { defineConfig } from '@playwright/test';
import path from 'path';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4000';

export default defineConfig({
  timeout: 30_000,
  outputDir: path.join(__dirname, 'playwright-report'),
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
  reporter: [
    ['list'],
    ['html', { outputFolder: path.join(__dirname, 'playwright-report'), open: 'never' }]
  ],
  use: {
    baseURL,
    headless: true
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium'
      }
    }
  ]
});
