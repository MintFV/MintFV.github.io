# WCAG Accessibility Testing - Dokumentation

Dieses Dokument beschreibt die automatisierten Accessibility-Tests für die MINT.FV Website.

## 🎯 Ziel

Sicherstellen, dass alle Veranstaltungsseiten den **WCAG 2.1 AA Standard** erfüllen, insbesondere:

- ✅ Farbkontrast-Verhältnis mindestens **4.5:1** (normal text) / **3:1** (large text)
- ✅ Alt-Texte für alle Bilder
- ✅ Korrekte Überschriften-Struktur
- ✅ Beschriftete Buttons und Links

## 🧪 Tests

### Automatisierte Tests (Playwright)

`tests/a11y.spec.ts` umfasst:

#### 1. **Color Contrast Test**

Validiert, dass alle Text-Elemente ausreichend Kontrast zu ihrem Hintergrund haben:

```plaintext
✅ WCAG AA Standard:
   • Normal text: mindestens 4.5:1
   • Large text (≥18px): mindestens 3:1
   • Graphiken & UI-Komponenten: mindestens 3:1
```

**Getestete Elemente:**
- Alle sichtbaren Text-Elemente
- Event-Card Badges
- Filter-Buttons
- Navigation Links
- Body Text

**Beispiel:**

```typescript
test('Color Contrast auf Veranstaltungen (Übersicht)', async ({ page }) => {
  await page.goto(`${BASE_URL}/veranstaltungen/`);
  
  // Prüft alle Textelemente auf ausreichend Kontrast
  // Berechnet relative Luminanz nach WCAG-Formel
  // Reportet Fehler mit gemessenem vs. erforderlichem Kontrast
});
```

#### 2. **Accessibility Structure Test**

Validiert die semantische HTML-Struktur:

- **H1-Überschriften:** Genau eine H1 pro Seite ✅
- **Unbeschriftete Buttons:** Alle Buttons sollten aria-label oder title haben
- **Alt-Texte:** Alle `<img>` sollten alt-Attribute haben
- **Überschriften-Hierarchie:** Korrekte Verschachtelung (h1 → h2 → h3)

**Beispiel:**

```plaintext
✅ Veranstaltungen (Übersicht): Accessibility Struktur OK
   • 1 H1-Überschrift
   • 0 Bilder ohne alt-Text
   • 0 Buttons ohne aria-label/title
```

## 🚀 Ausführung

### Lokal

```bash
# Starte Jekyll Server (notwendig)
bundle exec jekyll serve --port 4000

# Neue Terminal-Session
cd tests
npm run test:a11y
```

### In GitHub Actions

Automatisch ausgelöst bei Push/PR zu `main` oder `develop`:

```bash
# Läuft nach visuellen Tests
PLAYWRIGHT_BASE_URL=http://localhost:4001 npm run test:a11y
```

## 📊 Kontrast-Berechnung

Die Tests nutzen die **WCAG 2.1 Formel** zur Berechnung des Kontrast-Verhältnisses:

```
Contrast Ratio = (L1 + 0.05) / (L2 + 0.05)

Wobei L (Relative Luminance) = 
  0.2126 * R + 0.7152 * G + 0.0722 * B
  
(mit sRGB Linearisierung)
```

**Beispiele:**

| Vordergrund | Hintergrund | Kontrast | Status |
|---|---|---|---|
| Schwarz (#000) | Weiß (#FFF) | 21:1 | ✅ AA + AAA |
| #003d82 (Primary) | #FFF | 7.2:1 | ✅ AA |
| #666666 (Text) | #FFF | 6.3:1 | ✅ AA |
| #F0F8E8 (Badge) | #333 | 2.1:1 | ❌ Fehler |

## ❌ Häufige Fehler

### 1. Schlechter Kontrast bei Event-Type-Farben

**Problem:**

```css
/* ❌ Event Card Badge mit zu hellem Text */
.event-card__badge {
  background-color: var(--event-type-color);  /* z.B. #FFF4E6 (sehr hell) */
  color: #666666;  /* Zu dunkel für hellen Hintergrund */
}
```

**Lösung:**

```css
/* ✅ Text anpassen oder Hintergrundfarbe dunkler */
.event-card__badge {
  background-color: var(--event-type-color);
  color: var(--color-text);  /* Dunklerer Text */
}
```

### 2. Fehlende Alt-Texte

**Problem:**

```html
<!-- ❌ Fehler -->
<img src="event.jpg" />
```

**Lösung:**

```html
<!-- ✅ Richtig -->
<img src="event.jpg" alt="Roboter-Workshop für Kinder" />
```

### 3. Unbeschriftete Buttons

**Problem:**

```html
<!-- ❌ Fehler: Icon-Button ohne Label -->
<button>🔍</button>
```

**Lösung:**

```html
<!-- ✅ Richtig -->
<button aria-label="Suchen">🔍</button>
```

## 🔍 Debugging

### Test zeigt Fehler an

**Schritt 1:** Finde das Problem-Element

```plaintext
❌ button/link - Kontrast: 2.1:1 (erforderlich: 4.5:1)
   Farbe: rgb(100, 100, 100)
   Hintergrund: rgb(255, 255, 255)
```

**Schritt 2:** Öffne die Seite lokal und nutze DevTools

```javascript
// In Browser-Konsole
const el = document.querySelector('[your-selector]');
const style = window.getComputedStyle(el);
console.log('Color:', style.color);
console.log('Background:', style.backgroundColor);
```

**Schritt 3:** Berechne den Kontrast manuell

- Nutze Online-Tool: https://webaim.org/resources/contrastchecker/
- Oder nutze VS Code Extension: "WCAG Color Contrast Checker"

### Kontrast-Test schlägt für legitime Gründe fehl

**Beispiel:** Event-Type Badge mit sehr heller Farbe

**Option 1:** Farbe dunkler machen (bei `_data/event_types.yml`)

```yaml
ferienpass:
  color: "#FFF4E6"  # ← Ist sehr hell, nutze dunklere Variante
  # Besser: "#FFA500" oder "#FFB700"
```

**Option 2:** Text-Farbe für Badge anpassen

```css
.event-card__badge {
  background-color: var(--event-type-color);
  color: #333;  /* Dunklerer Text für helle Hintergründe */
}
```

**Option 3:** Badge mit Border statt Solid

```css
.event-card__badge {
  border: 2px solid var(--event-type-color);
  background-color: transparent;
  color: var(--event-type-color);
}
```

## ✅ Checkliste vor Commit

- [ ] `npm run test:a11y` läuft lokal ohne Fehler
- [ ] Alle Event-Type-Farben sind nicht zu hell (mindestens Kontrast 3:1)
- [ ] Alle `<img>` haben aussagekräftige alt-Texte
- [ ] Buttons sind beschriftet (Text oder aria-label)
- [ ] Überschriften-Struktur ist korrekt (eine H1, korrekte Verschachtelung)
- [ ] Keine Farb-abhängigen Informationen (z.B. nur rot = Error)

## 🔗 Weiterführende Ressourcen

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Color Contrast Analyzer Tool](https://www.tpgi.com/color-contrast-analyzer/)
- [Deque University a11y Training](https://dequeuniversity.com/)

## 📁 Test-Dateien

- `tests/a11y.spec.ts` – Accessibility Test Suite
- `tests/playwright.config.ts` – Playwright Konfiguration
- `.github/workflows/visual-tests.yml` – CI/CD Integration

## 📝 Dokumentation

- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) – Design System & Tokens
- [STYLELINT_RULES.md](STYLELINT_RULES.md) – CSS Token Compliance
- [VERANSTALTUNGEN_TECHNIK.md](../VERANSTALTUNGEN_TECHNIK.md) – Technische Architektur
