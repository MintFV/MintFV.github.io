# Förderverein MINTarium Hamburg e. V

Die Webseite des _Förderverein MINTarium Hamburg e. V._ wird ab 2026 bei Github gehostet und gepflegt.

Bei der Pflege sind mindestens zwei Modi zu beachten:

1. inhaltliche Anpassungen einpflegen in vorgegebene Strukturen
   1. Einpflegen von Verstanstaltungen jeder Art
   2. Bilder zu Verstaltungen einpflegen
   3. Anpassung Impressum (z.B. bei Neuwahlen des Vorstandes)
2. Strukturelle Weiterentwicklung der Webseite
   1. z.B. grundsätzliche Präsentation von Veranstaltungen anpassen
   2. neue Veranstaltungstypen einpflegen
   3. neue Webseiten Elemente bzw. Unterseiten zu neuen Themen einpflegen

Einen Einstieg zum Betrieb von Webseiten bei Github findet man unter <https://docs.github.com/de/pages>.

## inhaltliche Anpassungen

### einmalige Vorarbeiten

Die Pflege findet bei Github statt im Git-Repository <https://github.com/MintFV/MintFV.github.io>
Damit man Änderungen im Git-Repository vornehmen kann, braucht man einen [Github Account](https://docs.github.com/de/get-started/start-your-journey/creating-an-account-on-github).

Den Namen des neu erstellten Accounts bitte Andreas nennen, dieser lädt dann den neuen Nutzer in das Repository ein mit Schreibrechten.

### Pflege von Veranstaltungen

Die Veranstaltungspflege erfolgt über das **Decap CMS**:

- **CMS-Zugang:** <https://mintfv-cms.netlify.app/admin/>
- **Anleitung:** Siehe [VERANSTALTUNGEN_ANLEITUNG.md](VERANSTALTUNGEN_ANLEITUNG.md)
- **CI/CD Status:** <https://github.com/MintFV/MintFV.github.io/actions>

#### Wichtige Links

- **Netlify Dashboard:** <https://app.netlify.com/projects/mintfv-cms/overview>
- **iCal Feed Validator:** <https://icalendar.org/validator.html?url=http://mintfv.github.io/feeds/mintfv-events.ical>

## Strukturelle Weiterentwicklung der Webseite

Für strukturelle Änderungen (neue Veranstaltungstypen, Design-Anpassungen, etc.) siehe:

- **Design System:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Token System & Farben
- **CSS Architektur:** [ADR-CSS-REFACTOR.md](ADR-CSS-REFACTOR.md) - Architecture Decision Record
- **Technische Details:** [VERANSTALTUNGEN_TECHNIK.md](VERANSTALTUNGEN_TECHNIK.md) - Backend & Feeds

### Installation

1. Ruby und Bundler installieren (falls noch nicht vorhanden)
2. Dependencies installieren:

   ```bash
   bundle install
   ```

### Lokale Entwicklung

Diese Website verwendet das [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) Jekyll-Theme.

```bash
bundle exec jekyll serve
```

Die Website ist dann unter `http://localhost:4000` erreichbar.

## 🧪 Testing & Linting

Alle Test- und Linting-Tools befinden sich im `/tests/` Verzeichnis.

**📖 Vollständige Dokumentation:** [tests/TESTING.md](tests/TESTING.md)

### Quick Start

```bash
# CSS Linting
cd tests && npm run lint:css

# Visual Regression Tests
./tests/run-visual-tests.sh
```

### Verfügbare npm Scripts

```bash
cd tests

npm run lint:css              # Überprüfe CSS auf Fehler/Warnungen
npm run test:visual           # Führe Visual Tests aus (Server muss laufen)
npm run test:visual:update    # Aktualisiere Baselines nach CSS-Änderungen
npm run test:visual:docker    # Tests in Docker-Container
```

### GitHub Actions CI/CD

Zwei automatisierte Workflows laufen auf jedem Push/PR:

1. **Visual Regression Tests** (`.github/workflows/visual-tests.yml`)
   - Triggered: Push/PR zu `main` oder `develop`
   - Läuft auf: ubuntu-latest
   - Tests: Screenshot-Vergleiche für 3 Event-Seiten
   - Artifacts: Playwright HTML Report

2. **CSS Linting** (`.github/workflows/css-lint.yml`)
   - Triggered: Push/PR mit CSS-Änderungen zu `main` oder `develop`
   - Läuft auf: ubuntu-latest
   - Tests: Stylelint Standard + Custom-Regeln
   - Feedback: Automatischer PR-Kommentar bei Fehlern

**Status der Workflows:** `https://github.com/MintFV/MintFV.github.io/actions`

### Checker

- <https://icalendar.org/validator.html?url=http://mintfv.github.io/feeds/mintfv-events.ical>

### Verzeichnisstruktur

- `_config.yml` - Haupt-Konfigurationsdatei
- `index.md` - Startseite
- `_pages/` - Einzelne Seiten (Veranstaltungen, Mitgliedschaft, Datenschutz, Impressum)
- `_data/navigation.yml` - Navigation/Menü
- `assets/downloads/` - PDF-Dateien und Download-Materialien
- `assets/images/` - Bilder und Header-Grafiken
- `Gemfile` - Ruby-Dependencies
- `/opt/homebrew/lib/ruby/gems/3.4.0/gems/minimal-mistakes-jekyll-4.27.3/_layouts` - Theme Layouts
  - ```cd  $(bundle show minimal-mistakes-jekyll)/_layouts```

Die Website kann auf verschiedenen Plattformen bereitgestellt werden:

- **GitHub Pages**: Bei Push automatisch gebaut (bei Verwendung von `remote_theme`)
- **Netlify**: Automatisches Deployment über Git
- **Eigener Server**: Nach `bundle exec jekyll build` den `_site` Ordner hochladen

### Theme-Dokumentation

Vollständige Dokumentation: [https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

## Lizenz

Die Website-Inhalte gehören dem Förderverein MINTarium Hamburg e. V.
