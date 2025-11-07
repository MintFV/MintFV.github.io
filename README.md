# Förderverein MINTarium Hamburg e. V. - Jekyll Website

Diese Website verwendet das [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) Jekyll-Theme.

## Installation

1. Ruby und Bundler installieren (falls noch nicht vorhanden)
2. Dependencies installieren:

   ```bash
   bundle install
   ```

## Lokale Entwicklung

```bash
bundle exec jekyll serve
```

Die Website ist dann unter `http://localhost:4000` erreichbar.

## Verzeichnisstruktur

- `_config.yml` - Haupt-Konfigurationsdatei
- `index.md` - Startseite
- `_pages/` - Einzelne Seiten (Veranstaltungen, Mitgliedschaft, Datenschutz, Impressum)
- `_data/navigation.yml` - Navigation/Menü
- `assets/downloads/` - PDF-Dateien und Download-Materialien
- `assets/images/` - Bilder und Header-Grafiken
- `Gemfile` - Ruby-Dependencies

## Inhalte aktualisieren

### Veranstaltungen

Bearbeiten Sie die Datei `_pages/veranstaltungen.md`

### Mitgliedschaft

Bearbeiten Sie die Datei `_pages/mitgliedschaft.md`

### Startseite

Bearbeiten Sie die Datei `index.md`

### Navigation

Bearbeiten Sie die Datei `_data/navigation.yml`

## Deployment

Die Website kann auf verschiedenen Plattformen bereitgestellt werden:

- **GitHub Pages**: Bei Push automatisch gebaut (bei Verwendung von `remote_theme`)
- **Netlify**: Automatisches Deployment über Git
- **Eigener Server**: Nach `bundle exec jekyll build` den `_site` Ordner hochladen

## Theme-Dokumentation

Vollständige Dokumentation: [https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

## Lizenz

Die Website-Inhalte gehören dem Förderverein MINTarium Hamburg e. V.
