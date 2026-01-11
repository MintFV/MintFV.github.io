import { test, expect } from '@playwright/test';


const pages = [
  { path: '/veranstaltungen/', name: 'Veranstaltungen Übersicht' },
  { path: '/veranstaltungen/zukunft/', name: 'Veranstaltungen Zukunft' },
  { path: '/veranstaltungen/archiv/', name: 'Veranstaltungen Archiv' }
];

test.describe('Visual smoke (structure only)', () => {
  for (const { path, name } of pages) {
    test(`${name} (structure only)`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'networkidle' });

      // Mask all event cards and past highlight blocks (dynamic content)
      const maskSelectors = ['.event-card', '.events-past-highlight'];
      await expect(page).toHaveScreenshot({
        fullPage: true,
        animations: 'disabled',
        maxDiffPixelRatio: 0.05,
        timeout: 15000,
        mask: maskSelectors.map(selector => page.locator(selector))
      });
    });
  }
});
