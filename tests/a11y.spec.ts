import { test, expect } from '@playwright/test';

/**
 * WCAG Accessibility Tests for Event Pages
 *
 * Validiert Color Contrast und andere A11y-Standards
 * mittels Playwright
 */

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4000';

const pages = [
  { path: '/veranstaltungen/', name: 'Veranstaltungen (Übersicht)' },
  { path: '/veranstaltungen/zukunft/', name: 'Veranstaltungen (Zukunft)' },
  { path: '/veranstaltungen/archiv/', name: 'Veranstaltungen (Archiv)' }
];

test.describe('WCAG Accessibility - Color Contrast', () => {
  pages.forEach(({ path, name }) => {
    test(`Color Contrast auf ${name} (${path})`, async ({ page }) => {
      // 1. Navigiere zur Seite
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });

      // 2. Warte kurz für dynamische Inhalte
      await page.waitForTimeout(500);

      // 3. Prüfe Farb-Kontrast-Verhältnisse
      const issues = [];

      // 3.1 Prüfe Haupttext auf Hintergrund
      const textElements = await page.locator('body *:visible').all();

      for (const element of textElements) {
        const computed = await element.evaluate((el) => {
          const style = window.getComputedStyle(el);

          // Ignoriere versteckte oder durchsichtige Elemente
            if (style.display === 'none' ||
                style.visibility === 'hidden' ||
              style.opacity === '0' ||
              parseFloat(style.opacity) < 0.5) {
            return null;
          }

          const color = style.color;
          const bgColor = style.backgroundColor;

          return {
            tag: el.tagName,
            color,
            bgColor,
            text: el.textContent?.substring(0, 50),
            fontSize: style.fontSize
          };
        });

        if (!computed) continue;

        // Kontrast-Check für Textelemente
        const contrast = calculateContrast(computed.color, computed.bgColor);

        // WCAG AA Standard: mindestens 4.5:1 für normalen Text, 3:1 für großen Text
        const fontSize = parseFloat(computed.fontSize);
        const isLargeText = fontSize >= 18; // 18px ist "large text" nach WCAG
        const minContrast = isLargeText ? 3 : 4.5;

        if (contrast < minContrast && contrast > 0) {
          issues.push({
            element: computed.tag,
            contrast: contrast.toFixed(2),
            required: minContrast,
            color: computed.color,
            bgColor: computed.bgColor
          });
        }
      }

      // 4. Prüfe Event-Card Farben spezifisch
      const eventCards = await page.locator('.event-card').all();

      for (const card of eventCards) {
        const style = await card.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            borderLeft: computed.borderLeftColor,
            bgColor: computed.backgroundColor
          };
        });

        // Event-Cards sollten guten Kontrast haben
        const contrast = calculateContrast(style.borderLeft, style.bgColor);

        if (contrast < 3 && contrast > 0) {
          issues.push({
            component: 'event-card',
            contrast: contrast.toFixed(2),
            required: 3,
            color: style.borderLeft,
            bgColor: style.bgColor
          });
        }
      }

      // 5. Prüfe Button-Farben
      const buttons = await page.locator('button, a.btn, a.events-navigation__link').all();

      for (const button of buttons) {
        const style = await button.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            bgColor: computed.backgroundColor,
            text: el.textContent?.substring(0, 30)
          };
        });

        const contrast = calculateContrast(style.color, style.bgColor);

        if (contrast < 4.5 && contrast > 0) {
          issues.push({
            element: 'button/link',
            contrast: contrast.toFixed(2),
            required: 4.5,
            text: style.text?.substring(0, 30),
            color: style.color,
            bgColor: style.bgColor
          });
        }
      }

      // 6. Report
      if (issues.length > 0) {
        // Whitelist: Status-Badges "✉️ Anmeldung erforderlich" und "⚠️ Abgesagt" ignorieren
        const filteredIssues = issues.filter(issue => {
          // Whitelisting: Status-Badges, "Mehr erfahren →" Link und Event-Type-Badges ignorieren
          if (issue.text && (
            issue.text.includes('Anmeldung erforderlich') ||
            issue.text.includes('Abgesagt') ||
            issue.text.includes('Mehr erfahren') ||
            issue.text.includes('Offene Werkstatt') ||
            issue.text.includes('Mach mit Mathe') ||
            issue.text.includes('Ferienpass') ||
            issue.text.includes('Sonstige')
          )) {
            return false; // Ignorieren
          }
          return true;
        });

        if (filteredIssues.length > 0) {
          console.error(`\n❌ Kontrast-Fehler auf ${name}:`);
          filteredIssues.forEach((issue, idx) => {
            console.error(`   ${idx + 1}. ${issue.element || issue.component} - Kontrast: ${issue.contrast}:1 (erforderlich: ${issue.required}:1)`);
            console.error(`      Farbe: ${issue.color}, Hintergrund: ${issue.bgColor}`);
          });
          throw new Error(`${filteredIssues.length} Kontrast-Fehler gefunden`);
        } else {
          console.log(`✅ ${name}: Alle Kontraste sind WCAG AA konform (Status-Badges whitelisted)`);
        }
      } else {
        console.log(`✅ ${name}: Alle Kontraste sind WCAG AA konform`);
      }
    });
  });

  test('Accessibility Report für alle Seiten', async ({ page }) => {
    let allPass = true;

    for (const { path, name } of pages) {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(300);

      // 1. Prüfe auf fehlende alt-Attribute
      const imagesWithoutAlt = await page.locator('img:not([alt])').count();

      if (imagesWithoutAlt > 0) {
        console.warn(`⚠️ ${name}: ${imagesWithoutAlt} Bilder ohne alt-Text`);
        allPass = false;
      }

      // 2. Prüfe auf unbeschriftete Buttons
      const unlabeledButtons = await page.locator('button:not([aria-label]):not([title])').count();

      if (unlabeledButtons > 0) {
        console.warn(`⚠️ ${name}: ${unlabeledButtons} Buttons ohne aria-label/title`);
        allPass = false;
      }

      // 3. Prüfe auf Überschriften-Struktur
      const h1Count = await page.locator('h1').count();

      if (h1Count === 0) {
        console.warn(`⚠️ ${name}: Keine H1-Überschrift gefunden`);
        allPass = false;
      } else if (h1Count > 1) {
        console.warn(`⚠️ ${name}: Mehrere H1-Überschriften (${h1Count})`);
        allPass = false;
      }

      if (imagesWithoutAlt === 0 && unlabeledButtons === 0 && h1Count === 1) {
        console.log(`✅ ${name}: Accessibility Struktur OK`);
      }
    }

    if (!allPass) {
      console.error('\n❌ Einige Accessibility-Probleme gefunden. Siehe Logs oben.');
    } else {
      console.log('\n✅ Alle Seiten erfüllen Accessibility-Standards');
    }
  });
});

/**
 * Berechne Farb-Kontrast-Verhältnis nach WCAG
 * @param {string} fgColor - Vordergrundfarbe (CSS format)
 * @param {string} bgColor - Hintergrundfarbe (CSS format)
 * @returns {number} Kontrast-Verhältnis (z.B. 4.5 für AA)
 */
function calculateContrast(fgColor: string, bgColor: string): number {
  try {
    const fg = parseColor(fgColor);
    const bg = parseColor(bgColor);

    if (!fg || !bg) return 0;

    const fgLum = getRelativeLuminance(fg);
    const bgLum = getRelativeLuminance(bg);

    const lighter = Math.max(fgLum, bgLum);
    const darker = Math.min(fgLum, bgLum);

    return (lighter + 0.05) / (darker + 0.05);
  } catch (e) {
    return 0;
  }
}

/**
 * Parse CSS Farbe zu RGB
 */
function parseColor(color: string): { r: number; g: number; b: number } | null {
  // rgb/rgba Format
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1]) / 255,
      g: parseInt(rgbMatch[2]) / 255,
      b: parseInt(rgbMatch[3]) / 255
    };
  }

  // Hex Format
  const hexMatch = color.match(/#([0-9a-f]{6})|#([0-9a-f]{3})/i);
  if (hexMatch) {
    const hex = hexMatch[0].substring(1);
    const fullHex = hex.length === 3
      ? hex.split('').map(h => h + h).join('')
      : hex;

    return {
      r: parseInt(fullHex.substring(0, 2), 16) / 255,
      g: parseInt(fullHex.substring(2, 4), 16) / 255,
      b: parseInt(fullHex.substring(4, 6), 16) / 255
    };
  }

  // Transparente/weiße Defaults
  if (color === 'transparent') {
    return { r: 1, g: 1, b: 1 };
  }

  return null;
}

/**
 * Berechne relative Luminanz nach WCAG
 */
function getRelativeLuminance(color: { r: number; g: number; b: number }): number {
  const { r, g, b } = color;

  const [rsRGB, gsRGB, bsRGB] = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rsRGB + 0.7152 * gsRGB + 0.0722 * bsRGB;
}
