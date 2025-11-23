# Jekyll + Decap CMS: Veranstaltungsverwaltungssystem

**Target Model:** Claude Sonnet 4.5  
**Repository:** https://github.com/MintFV/MintFV.github.io/

---

## PROJEKT-KONTEXT

Ich entwickle eine Jekyll-basierte Vereinswebsite für MINT.FV, die via GitHub Pages veröffentlicht wird. Die Website soll ein Veranstaltungsverwaltungssystem mit Decap CMS erhalten, das auch von nicht-technischen Vereinsmitgliedern bedienbar ist.

---

## HAUPTZIEL

Implementiere ein vollständiges, produktionsreifes Veranstaltungssystem mit folgenden Kernmerkmalen:

- **Content Management:** Decap CMS mit deutscher, intuitiver Benutzeroberfläche
- **Veranstaltungstypen:** 4 verschiedene Typen mit unterschiedlichen Standardeinstellungen
- **Frontend:** Übersichtsseiten mit intelligenter Zeitfilterung und Pagination
- **Zusatzfeatures:** iCal/RSS-Feeds, Bildverwaltung, E-Mail-basierte Anmeldung

bzw. baue die vorhandenen Seiten entsprechend um.

---

## VERANSTALTUNGSTYPEN

Das System muss 4 verschiedene Veranstaltungstypen unterscheiden:

### 1. Mach mit Mathe - Ausstellung
- **Frequenz:** ~1x pro Monat
- **Anmeldung:** Standard NEIN
- **Ort:** Fester Standardort (z.B. "Ausstellungsraum")
- **Farbe:** Dezentes Hellblau (#E8F4F8 oder ähnlich)

### 2. Offene Werkstatt
- **Frequenz:** ~2x pro Monat
- **Anmeldung:** Standard NEIN
- **Ort:** Fester Standardort (z.B. "Werkstatt")
- **Farbe:** Dezentes Hellgrün (#F0F8E8 oder ähnlich)

### 3. Ferienpass Aktionen
- **Frequenz:** ~2x pro Jahr
- **Anmeldung:** Standard JA (ferienpass@mintfv.de)
- **Ort:** Standardort (z.B. "Vereinsräume")
- **Zusatzfelder:** Altersgruppe, Kosten pro Teilnehmer
- **Farbe:** Dezentes Hellorange (#FFF4E6 oder ähnlich)

### 4. Sonstige Veranstaltungen
- **Frequenz:** ~6x pro Jahr
- **Anmeldung:** Standard NEIN
- **E-Mail:** info@mintfv.de (falls Anmeldung aktiviert wird)
- **Farbe:** Dezentes Helllila (#F5F0F8 oder ähnlich)

**Wichtig:** Die Farben dienen nur zur dezenten visuellen Unterscheidung, nicht als dominantes Design-Element.

---

## ARCHITEKTUR-ENTSCHEIDUNGEN

### Collection-Design

**Verwende EINE Collection mit Type-Attribut** (nicht separate Collections pro Typ)

**Begründung:**
- Übersichtlichere UI für Nicht-Techniker
- Zentrale chronologische Sortierung
- Einfachere Code-Wartung
- Bessere Filter-Möglichkeiten

### Type-spezifische Defaults

Implementiere eine Lösung, die automatisch sinnvolle Standardwerte setzt, wenn ein Veranstaltungstyp ausgewählt wird:

- Bei "Mach mit Mathe" und "Offene Werkstatt": Anmeldung = NEIN, E-Mail-Feld leer
- Bei "Ferienpass": Anmeldung = JA, E-Mail vorausgefüllt
- Bei "Sonstige": Flexible Defaults

**Technologie:** JavaScript/Event-Listener in der Decap-Admin-Oberfläche oder eine andere geeignete Lösung.

---

## DATENMODELL

### Pflichtfelder (alle Events)

- Veranstaltungstyp (Select-Widget)
- Titel
- **Startdatum mit Uhrzeit** (IMMER mit Uhrzeit, kein "ganztägig")
- Kurzbeschreibung (ca. 10-200 Zeichen)
- Ausführliche Beschreibung (Markdown)
- Status: Veröffentlicht (Boolean)

### Optionale Felder

- Enddatum mit Uhrzeit (für mehrtägige Events)
- Veranstaltungsort
- **Bilder:**
  - Teaser-Bild (Vorschau für Übersichtsseiten)
  - Galerie (mehrere Bilder mit Bildunterschriften für Nachberichte)
- **Anmeldung:**
  - Anmeldung erforderlich? (Boolean/Select)
  - Anmelde-E-Mail
  - Anmeldefrist
  - Maximale Teilnehmerzahl
- Altersgruppe (primär für Ferienpass)
- Kosten (String, primär für Ferienpass)
- Verantwortliche Personen (Liste)
- Besondere Hinweise (Text)
- Veranstaltung abgesagt? (Boolean)

---

## FRONTEND-ANFORDERUNGEN

### Hauptübersichtsseite

**Anzeige-Logik:**
- Zeige **maximal 6 Veranstaltungen gleichzeitig**
- **4 zukünftige** Events (ab heute, chronologisch aufsteigend)
- **2 vergangene** Events (neueste zuerst, visuell dezent ausgegraut)
- **Effekt:** Kontinuität durch Mix aus Vergangenheit und Zukunft

**Darstellung pro Event:**
- Typ-Badge mit dezenter Hintergrundfarbe
- Datum & Uhrzeit prominent
- Ort (falls vorhanden)
- Kurzbeschreibung
- Teaser-Bild (falls vorhanden)
- Badge "Anmeldung erforderlich" (falls zutreffend)
- Link zur Detailseite

**Vergangene Events:** Reduzierte Opacity (~0.7) + leichter Grayscale-Filter (~30%)

### Zusatzseiten

#### Vergangenheit
- Alle vergangenen Events, neueste zuerst
- Pagination (z.B. 12 Events pro Seite)
- Client-seitige Filter für Veranstaltungstypen

#### Zukunft
- Alle zukünftigen Events, chronologisch aufsteigend
- Pagination (z.B. 12 Events pro Seite)
- Client-seitige Filter für Veranstaltungstypen

#### Filter-Funktionalität
- Buttons für "Alle" + 4 Veranstaltungstypen
- Client-seitiges Filtern (kein Page-Reload)
- Einfaches JavaScript (vanilla, kein Framework erforderlich)

### Event-Detailseite

**Inhalte:**
- Header: Typ-Badge, Titel, vollständige Datum/Zeit-Info, Ort
- Teaser-Bild (falls vorhanden, prominent)
- Ausführliche Beschreibung (Markdown gerendert)
- Anmeldebereich (conditional):
  - E-Mail-Link (mailto:)
  - Anmeldefrist
  - Max. Teilnehmerzahl
- Galerie für Nachberichte-Bilder (Grid-Layout, conditional)
- Besondere Hinweise (conditional)
- Aktionsbereich:
  - "Zum Kalender hinzufügen" (iCal-Download für einzelnen Event)
  - Zurück zur Übersicht

**Abgesagte Events:** Prominente Warnung/Banner oben

---

## ZUSATZFEATURES

### 1. iCal Feed

Generiere einen Feed für alle zukünftigen Veranstaltungen:
- Standard-konform (RFC 5545)
- Zeitzone: Europe/Berlin
- STATUS:CANCELLED für abgesagte Events
- Abonnierbar in Kalenderapps

### 2. RSS Feed

Generiere RSS 2.0 Feed:
- Letzte 50 Veranstaltungen (oder sinnvolle Anzahl)
- Kategorie = Veranstaltungstyp
- Standard RSS-Felder

### 3. Bildverwaltung

**Teaser:**
- Optional, für Vorschau
- Maximale Dateigröße (z.B. 5MB)

**Galerie:**
- Mehrere Bilder pro Event
- Jeweils mit optionaler Bildunterschrift
- Für Nachberichte nach Veranstaltungen
- Nachträglich ergänzbar

---

## DECAP CMS ANFORDERUNGEN

### UI-Gestaltung

- **Sprache:** Deutsch
- **Labels:** Nicht-technisch, klar verständlich (keine Entwickler-Begriffe)
- **Hilfe-Texte:** Bei jedem Feld erklärende Hinweise
- **Emojis:** Gerne in Select-Options (z.B. 🎨 🔧 🎪 📅) für bessere Orientierung
- **Sortierung:** Primär nach Datum, zusätzlich nach Titel/Typ möglich
- **Filter-Views:** Vordefinierte Filter für schnellen Zugriff auf Event-Typen
- **Slug-Pattern:** Automatisch generiert mit Datum (z.B. YYYY-MM-DD-titel)

### Widget-Auswahl

Wähle jeweils die am besten geeigneten Widgets:
- **Veranstaltungstyp:** Select (keine Freitext-Eingabe wegen Tippfehler-Gefahr)
- **Datum/Zeit:** DateTime mit deutschem Format (DD.MM.YYYY, HH:mm)
- **Anmeldung erforderlich:** Select oder Boolean (mit klaren Labels)
- **Beschreibung:** Markdown mit sinnvollen Formatierungs-Buttons
- **Bilder:** Image mit Größenlimit
- **Galerie:** List mit verschachtelten Feldern

---

## TECHNISCHE CONSTRAINTS

### Technologie-Stack
- **Jekyll** als Static Site Generator
- **Decap CMS** (ehemals Netlify CMS)
- **GitHub Pages** für Hosting
- **Git Gateway** als Backend
- **Vanilla JavaScript** (keine Frameworks wie React/Vue erforderlich)

### Performance & Kompatibilität
- Keine schweren JS-Frameworks
- Moderne Browser (Chrome, Firefox, Safari, Edge)
- CSS Grid/Flexbox erlaubt
- ES6+ JavaScript erlaubt
- Mobile-responsive

### SEO & Accessibility
- Semantisches HTML
- Strukturierte Permalinks
- Alt-Texte für Bilder (verpflichtend)
- ARIA-Labels wo sinnvoll
- Keyboard-Navigation
- Ausreichende Farbkontraste

---

## WICHTIGE DESIGN-PRINZIPIEN

### 1. Einfachheit für Nicht-Techniker
- Klare, deutsche Bezeichnungen
- Logische Feld-Reihenfolge
- Defaults reduzieren manuelle Eingaben
- Keine versteckten Features

### 2. DRY (Don't Repeat Yourself)
- Wiederverwendbare Komponenten (z.B. Event-Karten)
- Zentrale Daten (Event-Typen mit Farben/Defaults in Data-Datei)
- Modulare Includes/Partials

### 3. Robustheit
- Graceful Degradation bei fehlenden Bildern
- Fallbacks für optionale Felder
- Keine JavaScript-Errors bei fehlenden DOM-Elementen
- Validierung in Decap CMS (z.B. Textlängen, Pflichtfelder)

### 4. Wartbarkeit
- Kommentare in komplexer Logik
- Konsistente Namenskonventionen
- Dokumentation von Architektur-Entscheidungen

---

## WICHTIGE HINWEISE

### Wiederholende Events
Events werden **manuell angelegt** – keine Automatisierung nötig (wegen Schulferien, Ausnahmen, etc.)

### Anmeldung
Immer per **E-Mail** (mailto:-Links), keine Online-Formulare oder Datenbanken

### Archivierung
**Keine automatische Archivierung** – vollständige Historie soll erhalten bleiben

### Bilder
Müssen **nachträglich zu Events hinzufügbar** sein (für Nachberichte)

### Zeitzone
Alle Uhrzeiten in **Europe/Berlin** (CET/CEST)

---

## OUTPUT-ERWARTUNG

Bitte erstelle eine **vollständige, produktionsreife Implementierung** mit:

### Konfigurationsdateien
- Jekyll Collection-Definition
- Decap CMS Konfiguration (vollständig)
- Decap CMS Admin-Seite (mit Type-Default-Logik)
- Event-Type-Daten (zentrale Quelle für Typen, Farben, Defaults)

### Frontend-Komponenten
- Hauptübersichtsseite (4 zukünftig + 2 vergangen)
- Vergangenheits-Archiv mit Pagination
- Zukunfts-Übersicht mit Pagination
- Wiederverwendbare Event-Karte (Include/Partial)
- Wiederverwendbare Pagination (Include/Partial)
- Event-Detailseite (Layout)

### Feeds
- iCal Feed (standardkonform)
- RSS Feed (RSS 2.0)

### Styling
- CSS für alle Komponenten
- Responsive Grid-Layouts
- Typ-spezifische Farbkodierung
- Filter-Button-Styling
- Mobile-optimiert

### Code-Qualität
- Vollständig funktionsfähig (keine Platzhalter, keine TODOs)
- Inline-Kommentare bei komplexer Logik
- Dokumentation von wichtigen Entscheidungen

---

## IMPLEMENTIERUNGS-FREIHEIT

Du hast **freie Wahl** bei:
- Dateinamen und Verzeichnisstruktur (wähle Jekyll-Best-Practices)
- Liquid-Template-Struktur (solange funktional)
- CSS-Architektur (BEM, SMACSS, oder eigener Ansatz)
- JavaScript-Implementierung (solange vanilla JS)
- Pagination-Plugin (z.B. jekyll-paginate-v2 oder Alternative)
- beim Umbau der vorhandenen Seiten. Die vorhandenen Termine sind Beispiele und können angepasst werden.

**Erwartung:** Du triffst informierte Entscheidungen basierend auf Jekyll/Decap-Best-Practices und dokumentierst wichtige Architektur-Entscheidungen.

---


## VALIDIERUNG

Stelle vor der Ausgabe sicher, dass:

- [ ] Alle Komponenten vollständig und lauffähig sind
- [ ] YAML-Syntax korrekt (besonders Decap CMS Config)
- [ ] Liquid-Syntax korrekt
- [ ] JavaScript fehlerfrei
- [ ] CSS responsive
- [ ] Keine Hard-Coded-Werte (nutze zentrale Daten)
- [ ] Deutsche Sprache in UI-Elementen
- [ ] Type-spezifische Defaults funktionieren
- [ ] iCal-Feed RFC 5545-konform
- [ ] RSS-Feed RSS 2.0-konform

---

## FINALE ANWEISUNG

Beginne mit einer kurzen Architektur-Übersicht (welche Dateien/Ordner du anlegen wirst), erkläre wichtige Entscheidungen, und generiere dann die vollständige Implementierung. Beispiel Code braucht es nicht, weil ansonsten die Antwort zu lang wird. Überlege Dir, wie Schritte sinnvoll aufgeteilt werden können, damit die Antwort nicht zu lang wird.

**Struktur deiner Antwort:**
1. Architektur-Übersicht (Verzeichnisstruktur, wichtige Entscheidungen)
2. Konfigurationsdateien (Jekyll + Decap CMS)
3. Frontend-Komponenten (Liquid Templates, Includes, Layouts)
4. Feeds (iCal, RSS)
5. Styling (CSS)
6. Implementierung

