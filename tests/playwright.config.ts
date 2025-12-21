import { defineConfig } from '@playwright/test';
import path from 'path';

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4000';

export default defineConfig({
  timeout: 30_000,
  outputDir: path.join(__dirname, 'playwright-report'),
  snapshotDir: path.join(__dirname, 'visual.spec.ts-snapshots'),
  // Einheitliche Snapshot-Pfade ohne OS-Suffix, damit Linux CI und macOS lokal dieselben Baselines nutzen.
  snapshotPathTemplate: '{testDir}/visual.spec.ts-snapshots/{arg}-{projectName}{ext}',
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
