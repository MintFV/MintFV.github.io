import { test, expect } from '@playwright/test';

const pages = ['/veranstaltungen/', '/veranstaltungen/zukunft/', '/veranstaltungen/archiv/'];

test.describe('Visual smoke', () => {
  for (const path of pages) {
    test(`page ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: 'disabled',
        maxDiffPixelRatio: 0.05,
        timeout: 15000
      });
    });
  }
});
