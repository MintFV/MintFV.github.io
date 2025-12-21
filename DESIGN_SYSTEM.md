# MINT.FV Design System & Style Architektur

## Übersicht

Das Design System besteht aus **zwei unabhängigen aber synchronisierten Teilen**:

1. **Jekyll Website** (`assets/css/events.css` + `_data/`)
2. **Decap CMS Admin** (`cms-static/admin/`) – deployed zu Netlify, **autark**

---

## 🎨 Token System

### Zentrale CSS-Variablen (assets/css/events.css)

```css
:root {
  --color-primary: #003d82;
  --color-primary-strong: #002855;
  --color-primary-stronger: #001a3d;
  --color-surface: #ffffff;
  --color-surface-muted: #f5f5f5;
  --color-surface-soft: #f9f9f9;
  --color-border: #d0d0d0;
  --color-text: #333333;
  --color-text-muted: #666666;
  --color-link: #0066cc;
  --color-link-strong: #004999;
  --color-focus: #ffd700;
  --radius-sm: 6px;
  --radius-md: 8px;
  --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

Diese Tokens werden verwendet für:
- Alle Event-Cards
- Navigation Links
- Filter Buttons
- Pagination
- Action Buttons

---

## 🎯 Event-Type Farben

Event-Typ-Farben sind **zentral definiert in `_data/event_types.yml`**:

```yaml
mach-mit-mathe:
  color: "#E8F4F8"  # Hellblau
  emoji: "📐"

offene-werkstatt:
  color: "#F0F8E8"  # Hellgrün
  emoji: "🔧"

ferienpass:
  color: "#FFF4E6"  # Hell-Orange
  emoji: "🎪"

sonstige:
  color: "#F5F0F8"  # Hellviolett
  emoji: "📅"
```

### Synchronisations-Anforderungen

⚠️ **WICHTIG:** Event-Type Farben müssen in **3 Dateien** synchron gehalten werden:

| Datei | Zweck | Bereich |
|-------|-------|---------|
| `_data/event_types.yml` | Single Source of Truth | Jekyll Event-System |
| `cms-static/admin/event-types.json` | CMS Defaults + Quick-Buttons | Decap Admin (Netlify) |
| `cms-static/admin/custom-admin.css` | Admin UI Farben | CMS Styling (autark) |

**Workflow bei Farb-Änderung:**
1. Ändere Farbe in `_data/event_types.yml`
2. Kopiere denselben Wert nach `cms-static/admin/event-types.json`
3. Aktualisiere CSS-Variable in `cms-static/admin/custom-admin.css`:
   ```css
   :root {
     --event-color-TYPENAME: #NEWCOLOR;
   }
   ```
4. Test lokal: `bundle exec jekyll serve`
5. Test CMS-Admin: http://localhost:4000/cms-static/admin/

---

## 📁 Datei-Struktur

### Jekyll (Local + GitHub Pages)
```
assets/css/events.css          ← Zentrale Tokens (--color-*, --radius-*, etc.)
_data/event_types.yml          ← Event-Type Definitionen (Single Source of Truth)
_includes/event-card.html      ← Event Cards (nutzen --event-type-color Custom Property)
_includes/event-filters.html   ← Filter Buttons (nutzen --event-type-color)
_pages/veranstaltungen.md      ← Hauptseite (nutzt Klassen statt Inline-Styles)
```

### Decap CMS (Netlify-Deploy, **autark**)
```
cms-static/admin/
  ├── config.yml               ← CMS Konfiguration
  ├── index.html               ← Admin UI Entry
  ├── event-types.json         ← Event-Type Defaults (für Quick-Buttons, JavaScript)
  ├── custom-admin.css         ← Admin Styling (CSS-Variablen lokal)
  ├── preview.css              ← Preview-Styling
  └── index.html               ← JavaScript für Event-Type Auto-Fill
```

---

## 🎨 Styling-Patterns

### 1. Event-Type-Farben in Komponenten

**In HTML/Liquid (Jekyll):**
```liquid
<article style="--event-type-color: {{ event_type_data.color }};">
  <div class="event-card__badge"><!-- nutzt --event-type-color --></div>
</article>
```

**In CSS:**
```css
.event-card {
  border-left: 4px solid var(--event-type-color, var(--color-border));
}

.event-card__badge {
  background-color: var(--event-type-color, var(--color-surface-muted));
}
```

### 2. Zentrale Button-Styles

**Alle CTA-Buttons nutzen:**
```css
.events-navigation__link,
.events-feeds__link,
.btn.btn--info {
  background-color: var(--color-primary);
  border: 2px solid var(--color-primary-strong);
  color: #fff;
  /* ... etc */
}
```

**Nie:** Hardcoded Farben direkt in Komponenten.

### 3. Focus-States

**Konsistent überall:**
```css
.event-filter-btn:focus,
.pagination__link:focus {
  outline: 3px solid var(--color-focus);  /* #ffd700 */
  outline-offset: 1px;
}
```

---

## 📋 Checkliste für Änderungen

### Neue Event-Type hinzufügen:
- [ ] Eintrag in `_data/event_types.yml` hinzufügen (color, emoji, name)
- [ ] Eintrag in `cms-static/admin/event-types.json` hinzufügen
- [ ] CSS-Variable in `cms-static/admin/custom-admin.css` hinzufügen
- [ ] Select-Option in `cms-static/admin/config.yml` hinzufügen
- [ ] Test lokal + CMS

### Token-Farben ändern:
- [ ] `assets/css/events.css` `:root` aktualisieren
- [ ] Alle Komponenten prüfen (cards, buttons, filters)
- [ ] Lokaler Build: `bundle exec jekyll serve`
- [ ] Visuelle Tests: Kontrast, Lesbarkeit, A11y

### Event-Type-Farbe ändern:
- [ ] `_data/event_types.yml`
- [ ] `cms-static/admin/event-types.json`
- [ ] `cms-static/admin/custom-admin.css`
- [ ] Lokal testen (Jekyll + CMS)

---

## 🔍 Wichtige Hinweise

### ⚠️ cms-static/ ist autark

- **Darf NICHT** auf `assets/css/events.css` zugreifen
- **Muss** alle benötigten Styles lokal in `custom-admin.css` haben
- Wird zu Netlify kopiert, dann independent deployed
- Für lokale Entwicklung trotzdem vollständig funktional

### ✅ Single Source of Truth

Obwohl es mehrere Dateien gibt, gibt es einen klaren Ownership:
- **Farb-Definitions**: `_data/event_types.yml` (primär)
- **CMS-Defaults**: `cms-static/admin/event-types.json` (Kopie)
- **Admin-UI**: `cms-static/admin/custom-admin.css` (Referenz)

---

## 📖 Referenzen

- [VERANSTALTUNGEN_ANLEITUNG.md](./VERANSTALTUNGEN_ANLEITUNG.md) – Redakteur-Handbuch
- [VERANSTALTUNGEN_TECHNIK.md](./VERANSTALTUNGEN_TECHNIK.md) – Technische Tiefendoku
- [assets/css/events.css](./assets/css/events.css) – Zentrale Styles
- [_data/event_types.yml](./_data/event_types.yml) – Event-Definitionen
