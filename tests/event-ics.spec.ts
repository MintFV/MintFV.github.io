import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('Kalendersymbol und Button laden denselben Einzeltermin herunter', async ({ page }) => {
  await page.goto('/veranstaltungen/2026/11/28/2026-11-28-14-00-mach-mit-mathe-november-2026-mach-mit-mathe/');

  const icon = page.getByRole('link', { name: 'Einzeltermin als Kalenderdatei herunterladen' });
  const iconDownload = page.waitForEvent('download');
  await icon.focus();
  await page.keyboard.press('Enter');
  const iconFile = await iconDownload;

  const buttonDownload = page.waitForEvent('download');
  await page.getByRole('link', { name: '📥 Einzeltermin (.ics)' }).click();
  const buttonFile = await buttonDownload;

  expect(iconFile.suggestedFilename()).toBe(buttonFile.suggestedFilename());
  const normalizeTimestamp = (ics: string) => ics.replace(/^DTSTAMP:.*$/m, 'DTSTAMP:');
  const iconContent = await readFile(await iconFile.path(), 'utf8');
  const buttonContent = await readFile(await buttonFile.path(), 'utf8');
  expect(normalizeTimestamp(iconContent)).toBe(normalizeTimestamp(buttonContent));
  expect(iconContent).toContain('SUMMARY:Mach mit Mathe - November 2026');
});
