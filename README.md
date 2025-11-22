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

TODO

## Strukturelle Weiterentwicklung der Webseite

TODO

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

### Verzeichnisstruktur

- `_config.yml` - Haupt-Konfigurationsdatei
- `index.md` - Startseite
- `_pages/` - Einzelne Seiten (Veranstaltungen, Mitgliedschaft, Datenschutz, Impressum)
- `_data/navigation.yml` - Navigation/Menü
- `assets/downloads/` - PDF-Dateien und Download-Materialien
- `assets/images/` - Bilder und Header-Grafiken
- `Gemfile` - Ruby-Dependencies

Die Website kann auf verschiedenen Plattformen bereitgestellt werden:

- **GitHub Pages**: Bei Push automatisch gebaut (bei Verwendung von `remote_theme`)
- **Netlify**: Automatisches Deployment über Git
- **Eigener Server**: Nach `bundle exec jekyll build` den `_site` Ordner hochladen

### Theme-Dokumentation

Vollständige Dokumentation: [https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)

## Lizenz

Die Website-Inhalte gehören dem Förderverein MINTarium Hamburg e. V.
