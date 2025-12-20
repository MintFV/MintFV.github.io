# Veranstaltungsverwaltung - Anleitung für Redakteure

Diese Anleitung erklärt, wie Sie Veranstaltungen mit dem Decap CMS verwalten.

## Zugang zum CMS

1. Öffnen Sie im Browser: `https://mintfv.github.io/admin/`
2. Klicken Sie auf "Mit GitHub anmelden"
3. Melden Sie sich mit Ihrem GitHub-Account an
4. Bestätigen Sie die Berechtigung für das Repository

## Neue Veranstaltung erstellen

### 1. CMS öffnen
- Gehen Sie zu `/admin/` auf der Website
- Klicken Sie im Menü auf **"📅 Veranstaltungen"**

### 2. Neue Veranstaltung anlegen
- Klicken Sie oben rechts auf **"Neue Veranstaltung"**
- Sie sehen nun das Eingabeformular

### 3. Veranstaltungstyp wählen
**Wichtig:** Wählen Sie zuerst den Veranstaltungstyp aus! Das System füllt dann automatisch sinnvolle Standardwerte aus.

#### Verfügbare Typen:

- **🎨 Mach mit Mathe - Ausstellung**
  - Für monatliche Mathematik-Ausstellungen
  - Standard: Keine Anmeldung, Ort "Ausstellungsraum"

- **🔧 Offene Werkstatt**
  - Für offene Werkstatt-Termine
  - Standard: Keine Anmeldung, Ort "Werkstatt"

- **🎪 Ferienpass Aktion**
  - Für Ferienpass-Workshops
  - Standard: Anmeldung erforderlich bei ferienpass@mintfv.de
  - Zusatzfelder: Altersgruppe, Kosten

- **📅 Sonstige Veranstaltung**
  - Für alle anderen Events (Vereinstreffen, Sonderveranstaltungen, etc.)
  - Standard: Keine Anmeldung

### 4. Pflichtfelder ausfüllen

#### Titel
Kurzer, aussagekräftiger Name (z.B. "Roboter-Programmierung mit NAO")

#### Startdatum und Uhrzeit
- **Immer mit Uhrzeit!** (kein ganztägiges Event)
- Format: TT.MM.JJJJ, HH:mm

#### Kurzbeschreibung
- 10-200 Zeichen
- Wird auf Übersichtsseiten angezeigt
- Fassen Sie das Event in 1-2 Sätzen zusammen

#### Ausführliche Beschreibung
- Vollständige Beschreibung des Events
- Sie können Formatierungen nutzen:
  - **Fett**: `**Text**`
  - *Kursiv*: `*Text*`
  - Überschriften: `## Überschrift`
  - Listen: `- Listenpunkt`

#### Veröffentlicht
- ✅ **Aktiviert**: Event ist auf der Website sichtbar
- ❌ **Deaktiviert**: Event ist nur als Entwurf gespeichert

#### Erstellt am (automatisch)

- Wird **automatisch beim Erstellen** gesetzt
- **Zukünftige Events:** Aktuelles Datum/Uhrzeit (jetzt)
- **Vergangene Events:** Event-Datum (start_date)
- **Hinweis:** Sollte normalerweise nicht manuell geändert werden
- Wird für iCal-Kalender-Synchronisation verwendet

#### Zuletzt geändert (automatisch)

- Wird **automatisch bei jeder Bearbeitung** aktualisiert
- **Beim Erstellen:** Gleich wie "Erstellt am"
- **Bei Änderungen:** Aktuelles Datum/Uhrzeit
- **Hinweis:** Sollte nicht manuell geändert werden
- Kalender-Apps nutzen dieses Feld zur Synchronisation

#### Revisions-Nummer (automatisch)

- **Revisions-Zähler** für iCal-Kalender-Synchronisation
- **Neue Events:** Startet bei 0
- **Bei Bearbeitung:** Wird automatisch um 1 erhöht (1, 2, 3, ...)
- **Hinweis:** Nicht manuell ändern! Wird vom System verwaltet
- Kalender-Apps nutzen dies, um zu erkennen, welche Version neuer ist

### 5. Optionale Felder

#### Enddatum
Nur ausfüllen, wenn:
- Event länger als einen Tag dauert
- Ende zu einer anderen Uhrzeit ist (z.B. 10:00-15:00 Uhr)

#### Veranstaltungsort
- Wird automatisch vorausgefüllt (je nach Typ)
- Kann angepasst werden

#### Bilder

**Vorschaubild:**
- Wird auf Übersichtsseiten angezeigt
- Max. 5 MB
- Empfohlen: 800x600 Pixel, JPG oder PNG
- **Wichtig:** Bildunterschrift ausfüllen (für Barrierefreiheit)

**Bildergalerie:**
- Für Nachberichte nach der Veranstaltung
- Mehrere Bilder möglich
- Kann nachträglich ergänzt werden
- Jedes Bild kann eine Bildunterschrift haben

#### Anmeldung

**Anmeldung erforderlich?**
- Wird automatisch vorausgefüllt (Ferienpass = Ja, andere = Nein)
- Kann angepasst werden

**Anmelde-E-Mail:**
- Wird automatisch vorausgefüllt
- Empfänger für Anmeldungen

**Anmeldefrist:**
- Bis wann können sich Teilnehmer anmelden?
- Optional

**Maximale Teilnehmerzahl:**
- Wie viele Personen können maximal teilnehmen?
- Optional

#### Zusatzinformationen (primär für Ferienpass)

**Altersgruppe:**
- z.B. "8-12 Jahre", "Ab 10 Jahren"

**Kosten:**
- z.B. "Kostenfrei", "5 Euro", "10 Euro inkl. Material"

**Verantwortliche Personen:**
- Liste der Organisatoren/Betreuer
- Klicken Sie auf "+ Eintrag hinzufügen" für mehrere Personen

**Besondere Hinweise:**
- Z.B. "Bitte Verpflegung mitbringen"
- "Wetterabhängig"
- "USB-Stick mitbringen"

**Veranstaltung abgesagt?**
- ⚠️ Nur aktivieren, wenn Event abgesagt wurde
- Wird prominent auf der Website angezeigt

### 6. Speichern

- **"Speichern"**: Entwurf speichern (noch nicht veröffentlicht)
- **"Veröffentlichen"**: Direkt auf der Website veröffentlichen

## Veranstaltung bearbeiten

1. Gehen Sie zu **"📅 Veranstaltungen"**
2. Klicken Sie auf die gewünschte Veranstaltung
3. Nehmen Sie Ihre Änderungen vor
4. Klicken Sie auf **"Speichern"**

## Bilder nachträglich hinzufügen

Sie können Bilder auch nach der Veranstaltung ergänzen:

1. Öffnen Sie die Veranstaltung zur Bearbeitung
2. Scrollen Sie zu **"Bildergalerie"**
3. Klicken Sie auf **"+ Eintrag hinzufügen"**
4. Laden Sie das Bild hoch
5. Fügen Sie eine Bildunterschrift hinzu
6. Wiederholen Sie für weitere Bilder
7. Speichern

## Veranstaltung löschen

1. Öffnen Sie die Veranstaltung
2. Klicken Sie oben rechts auf die drei Punkte (⋮)
3. Wählen Sie **"Eintrag löschen"**
4. Bestätigen Sie die Löschung

**Hinweis:** Gelöschte Veranstaltungen können nicht wiederhergestellt werden!

## Filter nutzen

Über der Veranstaltungsliste sehen Sie Filter-Buttons:
- **Mach mit Mathe 🎨**
- **Offene Werkstatt 🔧**
- **Ferienpass 🎪**
- **Sonstige 📅**
- **Veröffentlicht**
- **Entwürfe**

Klicken Sie auf einen Filter, um nur bestimmte Veranstaltungen anzuzeigen.

## Sortierung

Sie können die Liste sortieren nach:
- **Startdatum** (Standard: Neueste zuerst)
- **Titel** (alphabetisch)
- **Veranstaltungstyp**

Klicken Sie auf die Spaltenüberschrift, um die Sortierung zu ändern.

## Tipps & Best Practices

### ✅ Do's

- **Immer** Veranstaltungstyp zuerst auswählen (automatische Vorauswahl)
- **Kurzbeschreibung** prägnant halten (max. 200 Zeichen)
- **Bildunterschriften** ausfüllen (Barrierefreiheit!)
- **Entwurf** speichern, wenn noch nicht fertig
- **Bilder optimieren** vor dem Upload (max. 1-2 MB pro Bild)
- Nach der Veranstaltung **Galerie-Bilder** ergänzen

### ❌ Don'ts

- Nicht mehrere Events gleichzeitig bearbeiten
- Nicht vergessen, auf "Speichern" zu klicken
- Nicht zu große Bilder hochladen (> 5 MB)
- Nicht ohne Bildunterschrift bei Vorschaubildern

## Häufige Fragen

### Wie erstelle ich eine mehrtägige Veranstaltung?
Füllen Sie das Feld **"Enddatum und Uhrzeit"** aus.

### Wie erstelle ich eine Veranstaltungsreihe?
Jeder Termin muss einzeln angelegt werden. Dies ermöglicht Flexibilität (z.B. Schulferien, Feiertage).

### Kann ich eine Veranstaltung wieder rückgängig machen?
Ja, setzen Sie **"Veröffentlicht"** auf ❌ oder löschen Sie die Veranstaltung.

### Was passiert, wenn ich eine Veranstaltung abgesagt habe?
Aktivieren Sie **"Veranstaltung abgesagt?"**. Die Veranstaltung wird prominent mit Warnung angezeigt.

### Wo werden die Bilder gespeichert?
Im Ordner `assets/images/events/` im Repository.

### Wie kann ich die Veranstaltung teilen?
Jede Veranstaltung hat eine eigene URL: `/veranstaltungen/[typ]/[titel]/`

## Vorschau auf der Website

Nach dem Speichern/Veröffentlichen dauert es ca. 2-5 Minuten, bis die Änderungen auf der Website sichtbar sind (GitHub Pages Build-Zeit).

### Wo werden Veranstaltungen angezeigt?

- **Hauptübersicht** (`/veranstaltungen/`): 4 zukünftige + 2 vergangene Events
- **Kommende** (`/veranstaltungen/zukunft/`): Alle zukünftigen Events
- **Archiv** (`/veranstaltungen/archiv/`): Alle vergangenen Events
- **Detailseite**: Jede Veranstaltung hat eine eigene Seite

## Support

Bei Fragen oder Problemen wenden Sie sich an:

- **Website:** https://www.mintarium-fv.de/
- **E-Mail:** <info@mintarium-fv.de>
- **GitHub Issues:** https://github.com/MintFV/MintFV.github.io/issues

## Feeds

Die Veranstaltungen werden automatisch in folgenden Formaten bereitgestellt:

- **iCal-Feed:** `/feeds/mintfv-events.ical` (für Kalender-Apps)
- **RSS-Feed:** `/feeds/mintfv-events.xml` (für Feed-Reader)

Diese werden automatisch aktualisiert, wenn neue Veranstaltungen hinzugefügt werden.
