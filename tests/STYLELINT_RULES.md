# Stylelint Token Compliance Rules

Dieses Dokument beschreibt die Stylelint-Konfiguration für Token-Compliance auf der MINT.FV Website.

## 🎯 Ziel

Verhindere Hardcoded-Farben und erzwinge die Nutzung von CSS-Variablen (Tokens) aus `assets/css/events.css`.

## ✅ Erlaubte Farb-Definitionen

### 1. CSS Custom Properties (Token-Referenzen)

```css
/* ✅ RICHTIG */
.event-card {
  color: var(--color-text);
  background-color: var(--color-surface);
  border-left: 4px solid var(--event-type-color);
}

/* Mit Fallback */
.event-card__badge {
  background-color: var(--event-type-color, var(--color-surface-muted));
}
```

### 2. Reservierte Werte

```css
/* ✅ Diese sind erlaubt (außer var()) */
color: transparent;
color: inherit;
color: currentColor;
color: initial;
color: unset;
```

### 3. Event-Type-spezifische Farben

```liquid
<!-- In HTML/Liquid (Jekyll) -->
<article style="--event-type-color: {{ event_type_data.color }};">
  <div class="event-card__badge">
    <!-- CSS nutzt: var(--event-type-color) -->
  </div>
</article>
```

## ❌ Nicht Erlaubt

```css
/* ❌ FALSCH: Hardcoded Hexwerte */
.event-card {
  color: #333333;
  background-color: #ffffff;
  border-color: #E8F4F8;
}

/* ❌ FALSCH: RGB ohne var() */
.button {
  background-color: rgb(100, 150, 200);
}

/* ❌ FALSCH: Inline Styles ohne Custom Properties */
<div style="background-color: #E8F4F8;"></div>

/* ❌ FALSCH: Hardcoded in _pages/ Dateien */
---
<style>
  .title { color: #003d82; }  /* NEIN! Nutze --color-primary */
</style>
---
```

## 🔧 Verfügbare Tokens

### Farb-Tokens (assets/css/events.css)

```css
:root {
  --color-primary: #003d82;                /* Hauptfarbe */
  --color-primary-strong: #002855;         /* Dunklere Variante */
  --color-primary-stronger: #001a3d;       /* Noch dunkler */
  
  --color-surface: #ffffff;                /* Hintergrund */
  --color-surface-muted: #f5f5f5;          /* Sekundärer Hintergrund */
  --color-surface-soft: #f9f9f9;           /* Weicher Hintergrund */
  
  --color-border: #d0d0d0;                 /* Randfarbe */
  
  --color-text: #333333;                   /* Haupttext */
  --color-text-muted: #666666;             /* Gedimmter Text */
  
  --color-link: #0066cc;                   /* Link-Farbe */
  --color-link-strong: #004999;            /* Visitierte Links */
  
  --color-focus: #ffd700;                  /* Focus-Outline */
}
```

### Border-Radius Tokens

```css
--radius-sm: 6px;
--radius-md: 8px;
```

### Shadow Tokens

```css
--shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
```

### Event-Type-spezifische Tokens (Dynamisch)

```css
/* Gesetzt via style="--event-type-color: {{ color }}" in Templates */
--event-type-color: (dynamisch je nach Event-Typ)
```

## 🔍 Wie man Fehler beheben kann

### Fehler: "Hardcoded Farben sind nicht erlaubt"

**Szenario 1: Neue Komponente**

```css
/* ❌ FALSCH */
.my-component {
  background-color: #E8F4F8;
}

/* ✅ RICHTIG: Nutze Token */
.my-component {
  background-color: var(--color-surface-soft);
}
```

**Szenario 2: Event-Type-spezifische Farben**

```css
/* ❌ FALSCH */
.event-filter-btn--mach-mit-mathe {
  background-color: #E8F4F8;
}

/* ✅ RICHTIG: Nutze Custom Property */
.event-filter-btn--type {
  background-color: var(--event-type-color);
}

/* In Template: */
<button style="--event-type-color: {{ event_type_data.color }};">
```

**Szenario 3: CMS Admin Styling**

```css
/* ❌ FALSCH */
.cms-editor {
  background-color: #ffd700;
}

/* ✅ RICHTIG: In custom-admin.css CSS-Variablen nutzen */
.cms-editor {
  background-color: var(--event-color-mach-mit-mathe);
}

/* Und in cms-static/admin/custom-admin.css definieren: */
:root {
  --event-color-mach-mit-mathe: #E8F4F8;
  --event-color-offene-werkstatt: #F0F8E8;
  --event-color-ferienpass: #FFF4E6;
  --event-color-sonstige: #F5F0F8;
}
```

## 🚀 Stylelint Ausführung

```bash
# Prüfe alle CSS-Dateien
npm run lint:css

# Nur Jekyll CSS
npm run lint:css -- ../assets/css/

# Nur CMS CSS
npm run lint:css -- ../cms-static/admin/

# Auto-Fix (wo möglich)
npx stylelint ../assets/css --fix
```

## 📝 Checkliste vor Commit

- [ ] Keine Hardcoded Hexwerte in CSS
- [ ] Alle Farben nutzen `var(--...)`
- [ ] Event-Type-Farben nutzen `--event-type-color`
- [ ] CMS-Farben nutzen `--event-color-*`
- [ ] Border-Radius: `--radius-sm` oder `--radius-md`
- [ ] Schatten: `--shadow-soft` oder `--shadow-hover`
- [ ] `npm run lint:css` läuft ohne Fehler
- [ ] `npm run validate:tokens` läuft ohne Fehler

## 🔗 Weitere Dokumentation

- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) – Design System Übersicht
- [ADR-CSS-REFACTOR.md](../ADR-CSS-REFACTOR.md) – Architektur-Entscheidungen
- [assets/css/events.css](../assets/css/events.css) – Token-Definitionen
