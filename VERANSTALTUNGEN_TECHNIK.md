# Veranstaltungssystem - Technische Dokumentation

## Architektur-Übersicht

Das Veranstaltungssystem basiert auf Jekyll mit Decap CMS und besteht aus folgenden Komponenten:

### Verzeichnisstruktur

```text
_events/                          # Collection für alle Veranstaltungen
_data/
  event_types.yml                 # Zentrale Definition der Event-Typen (Single Source of Truth)
_layouts/
  event.html                      # Layout für Event-Detailseiten
_includes/
  event-card.html                 # Wiederverwendbare Event-Karte
  pagination.html                 # Pagination-Komponente
  event-filters.html              # Filter-Buttons
  head/
    custom.html                   # CSS-Einbindung
_pages/
  veranstaltungen.md             # Hauptübersicht (4 zukünftig + 2 vergangen)
  veranstaltungen-archiv.md      # Alle vergangenen Events
  veranstaltungen-zukunft.md     # Alle zukünftigen Events
admin/
  config.yml                      # Decap CMS Konfiguration
  index.html                      # Admin-Interface mit Type-Defaults
assets/
  css/
    events.css                    # Event-System Styling (BEM-Architektur)
  js/
    event-filters.js              # Client-seitige Filter-Logik
feeds/
  events.ical                     # iCal Feed (RFC 5545)
  events.xml                      # RSS 2.0 Feed
```

## Wichtige Architektur-Entscheidungen

### 1. Single Collection Design

**Entscheidung:** EINE Collection `_events` mit `event_type` Attribut statt separate Collections.

**Vorteile:**

- Übersichtlichere UI für Nicht-Techniker
- Zentrale chronologische Sortierung
- Einfachere Code-Wartung
- Bessere Filter-Möglichkeiten
- Konsistente Permalinks

**Implementierung:**

```yaml
# _config.yml
collections:
  events:
    output: true
    permalink: /veranstaltungen/:categories/:title/
```

### 2. Zentrale Event-Type-Daten

**Entscheidung:** `_data/event_types.yml` als Single Source of Truth für:

- Type-Namen und Emojis
- Farbkodierung
- Standard-Einstellungen

**Vorteile:**

- Keine Hard-Coded-Werte
- Einfache Anpassung der Typen
- Konsistenz zwischen CMS und Frontend
- DRY-Prinzip

**Verwendung:**

```liquid
{% assign event_types = site.data.event_types %}
{% assign event_type_data = event_types[event.event_type] %}
{{ event_type_data.name }}
{{ event_type_data.color }}
```

### 3. Type-spezifische Defaults im CMS

**Herausforderung:** Decap CMS unterstützt keine nativen type-abhängigen Defaults.

**Lösung:** JavaScript Event-Listener in `admin/index.html`
- Polling-Mechanismus für asynchrones DOM-Loading
- Event-Listener auf `event_type` Select-Element
- Automatisches Setzen von Location, Registration, Email

**Limitation:** Funktioniert nur beim Erstellen neuer Events, nicht beim Bearbeiten.

### 4. Zeitfilterung ohne Plugin

**Entscheidung:** Liquid-Templates für Zeitfilterung statt Jekyll-Pagination-Plugin.

**Vorteile:**
- Kompatibel mit GitHub Pages (keine Custom Plugins)
- Volle Kontrolle über Logik
- Keine zusätzlichen Dependencies

**Implementierung:**
```liquid
{% assign now = site.time | date: '%s' %}
{% assign event_start = event.start_date | date: '%s' %}
{% if event_start >= now %}
  {# Zukünftiges Event #}
{% endif %}
```

### 5. CSS-Architektur

**Entscheidung:** BEM (Block Element Modifier) Methodik

**Struktur:**
```css
.event-card { }                    /* Block */
.event-card__title { }             /* Element */
.event-card--past { }              /* Modifier */
```

**Vorteile:**
- Modularer, wiederverwendbarer Code
- Klare Naming-Conventions
- Keine CSS-Konflikte mit Theme
- Einfach wartbar

## Datenmodell

### Event-Frontmatter

```yaml
# Pflichtfelder
event_type: "mach-mit-mathe" | "offene-werkstatt" | "ferienpass" | "sonstige"
title: String
start_date: DateTime (YYYY-MM-DD HH:mm)
excerpt: String (10-200 Zeichen)
published: Boolean

# Optionale Felder
end_date: DateTime
location: String
teaser_image: Path
teaser_alt: String
gallery:
  - image: Path
    caption: String
registration_required: Boolean
registration_email: String
registration_deadline: Date
max_participants: Integer
age_group: String
cost: String
organizers: Array[String]
notes: Text
cancelled: Boolean
```

## Frontend-Logik

### Hauptübersicht (4+2 Strategie)

**Ziel:** Mix aus Zukunft und Vergangenheit für Kontinuität

**Algorithmus:**
1. Alle veröffentlichten Events nach `start_date` sortieren
2. In `upcoming` und `past` Arrays aufteilen (basierend auf `site.time`)
3. Erste 4 aus `upcoming` nehmen
4. Letzte 2 aus `past` nehmen (reversed)
5. In Grid anzeigen

**Code:** `_pages/veranstaltungen.md`

### Client-seitige Filter

**Technologie:** Vanilla JavaScript (ES6+)

**Funktionsweise:**
1. Alle `.event-card` Elemente sammeln
2. Filter-Buttons mit Event-Listenern versehen
3. Bei Click: `data-event-type` Attribut prüfen
4. Cards mit `display: none` ausblenden
5. Zähler aktualisieren

**Code:** `assets/js/event-filters.js`

### Styling für vergangene Events

**Implementierung:**
```css
.event-card--past {
  opacity: 0.7;
  filter: grayscale(30%);
}
```

**Anwendung:**
```liquid
{% if is_past_event %}event-card--past{% endif %}
```

## Feeds

### iCal Feed (RFC 5545)

**Besonderheiten:**
- `TZID=Europe/Berlin` für alle Zeiten
- `STATUS:CANCELLED` für abgesagte Events
- `UID` basierend auf Event-ID + Domain
- Nur zukünftige Events

**Validierung:** https://icalendar.org/validator.html

### RSS 2.0 Feed

**Besonderheiten:**
- Letzte 50 Events (alle, nicht nur zukünftige)
- Kategorie = Event-Type-Name
- Vollständige HTML-Beschreibung in `<content:encoded>`
- Styled für RSS-Reader

## Decap CMS Konfiguration

### Backend

```yaml
backend:
  name: git-gateway
  branch: main
```

**Authentifizierung:**
- GitHub OAuth via Netlify Identity oder Git Gateway
- Alternativ: GitHub App-basierte Authentifizierung

### Media Library

```yaml
media_folder: "assets/images/events"
public_folder: "/assets/images/events"
```

**Constraints:**
- Max. 5 MB pro Bild (in Widget-Config)
- Keine automatische Bild-Optimierung

### View Filters

**Implementierung:**
```yaml
view_filters:
  - label: "Mach mit Mathe 🎨"
    field: event_type
    pattern: 'mach-mit-mathe'
```

**Vorteil:** Schneller Zugriff auf Event-Typen ohne Suche

## Performance-Optimierungen

### 1. Lazy Loading für Bilder

```html
<img loading="lazy" ... >
```

### 2. CSS Grid statt JavaScript-Layouts

- Native Browser-Performance
- Kein JavaScript-Overhead
- Responsive ohne Media-Query-Queries

### 3. Minimal JavaScript

- Vanilla JS, keine Frameworks
- Nur für Filter (optional)
- Graceful Degradation

## Accessibility (A11y)

### Implementierte Features

1. **Semantisches HTML**
   - `<article>`, `<nav>`, `<time>` Tags
   - Strukturierte Überschriften-Hierarchie

2. **ARIA-Labels**
   - `aria-label` für Filter-Buttons
   - `aria-live="polite"` für Zähler
   - `aria-current="page"` für Pagination

3. **Alt-Texte**
   - Pflichtfeld in Decap CMS
   - Fallback zu `title` wenn leer

4. **Keyboard-Navigation**
   - Focus-Styles für alle interaktiven Elemente
   - Tab-Reihenfolge logisch

5. **Farbkontraste**
   - WCAG AA konform
   - Dezente Farben mit ausreichendem Kontrast

## SEO

### Structured Data (Schema.org)

Implementiert in `_layouts/event.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "...",
  "startDate": "...",
  "location": { ... },
  ...
}
```

**Vorteil:** Rich Snippets in Google Search Results

### Permalinks

**Pattern:** `/veranstaltungen/:categories/:title/`

**Beispiel:** `/veranstaltungen/workshop/nao-roboter-ferienpass/`

**SEO-Vorteile:**
- Sprechende URLs
- Keywords in URL
- Konsistente Struktur

## Testing

### Manuelle Tests

**Checkliste:**
- [ ] Neue Veranstaltung erstellen (alle 4 Typen)
- [ ] Bilder hochladen (< 5 MB und > 5 MB)
- [ ] Filter-Funktionalität testen
- [ ] Mobile Darstellung prüfen
- [ ] iCal-Feed in Kalender-App importieren
- [ ] RSS-Feed in Feed-Reader testen
- [ ] Vergangene/Zukünftige Events korrekt angezeigt
- [ ] Abgesagte Events prominent markiert
- [ ] Keyboard-Navigation funktioniert

### Validation

**YAML:**
```bash
bundle exec jekyll build
```

**HTML:**
https://validator.w3.org/

**CSS:**
https://jigsaw.w3.org/css-validator/

**iCal:**
https://icalendar.org/validator.html

## Deployment

### GitHub Pages

**Workflow:**
1. Push zu `main` Branch
2. GitHub Actions Build
3. Deploy nach `gh-pages`
4. ~2-5 Minuten bis live

**Build-Command:**
```bash
bundle exec jekyll build
```

### Decap CMS Authentication

**Setup für GitHub Pages ohne Netlify:**

Option 1: **Netlify Identity** (empfohlen)
- Kostenlos bis 1000 Nutzer
- Einfaches Setup

Option 2: **GitHub OAuth App**
- Eigener OAuth-Server erforderlich
- z.B. mit Cloudflare Workers

**Anleitung:** https://decapcms.org/docs/github-backend/

## Wartung

### Regelmäßige Aufgaben

**Monatlich:**
- [ ] Vergangene Events auf Bilder prüfen (Nachberichte)
- [ ] Zukünftige Events auf Aktualität prüfen

**Vierteljährlich:**
- [ ] Jekyll & Dependencies updaten
- [ ] Decap CMS Version prüfen

**Jährlich:**
- [ ] Sehr alte Events (> 2 Jahre) optional archivieren

### Backup

**Automatisch:**
- Git-Repository = vollständiges Backup
- GitHub speichert alle Versionen

**Empfehlung:**
- Zusätzliche Backups von Bildern (große Dateien)
- Branch-Protection für `main`

## Erweiterungsmöglichkeiten

### Zukünftige Features

**Nice-to-have:**
1. **Kalender-View:** Monatsansicht mit allen Events
2. **Map-Integration:** Google Maps für Event-Locations
3. **Ticket-System:** Integration mit Pretix o.ä.
4. **Newsletter:** Automatische Versendung neuer Events
5. **Teilnehmer-Zähler:** Live-Anzeige freier Plätze

**Implementierung:** Würde Custom-Plugins oder externe Services erfordern.

## Troubleshooting

### Problem: Events werden nicht angezeigt

**Checkliste:**
1. `published: true` gesetzt?
2. `start_date` im korrekten Format?
3. Collection in `_config.yml` korrekt?
4. Jekyll Build erfolgreich?

### Problem: CSS wird nicht geladen

**Lösung:**
1. Prüfen ob `_includes/head/custom.html` existiert
2. Pfad in `custom.html` korrekt?
3. Browser-Cache leeren
4. Build neu ausführen

### Problem: Filter funktionieren nicht

**Checkliste:**
1. JavaScript aktiviert?
2. `event-filters.js` geladen?
3. DOM-Elemente vorhanden?
4. Browser-Konsole auf Fehler prüfen

### Problem: Decap CMS Login funktioniert nicht

**Lösungen:**
1. GitHub OAuth korrekt konfiguriert?
2. Repository-Berechtigung erteilt?
3. `backend` in `config.yml` korrekt?
4. Git Gateway aktiviert (bei Netlify)?

## Support & Weiterentwicklung

**Repository:** https://github.com/MintFV/MintFV.github.io

**Issues:** https://github.com/MintFV/MintFV.github.io/issues

**Pull Requests:** Willkommen!

**Kontakt:** webmaster@mintfv.de

## Lizenz

Siehe `LICENSE` im Repository.

---

**Letzte Aktualisierung:** November 2025  
**Version:** 1.0  
**Autor:** GitHub Copilot (Claude Sonnet 4.5)
