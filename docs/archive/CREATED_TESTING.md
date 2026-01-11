# CREATED, LAST-MODIFIED & SEQUENCE Testing Checkliste

## ✅ Implementierung abgeschlossen

Die CREATED, LAST-MODIFIED und SEQUENCE Funktionalität wurde erfolgreich implementiert auf allen Ebenen:

### 1. Decap CMS Konfiguration ✅
- [x] `created` Feld in `cms-static/admin/config.yml` hinzugefügt
- [x] `last_modified` Feld hinzugefügt
- [x] `sequence` Feld hinzugefügt (Number-Widget, min: 0)
- [x] Position: Nach `published`, vor optionalen Feldern
- [x] Format: DateTime für CREATED/LAST-MODIFIED (`YYYY-MM-DD HH:mm`), Integer für SEQUENCE
- [x] Automatisch als "optional" markiert mit Hinweisen

### 2. JavaScript Auto-Befüllung ✅
- [x] `applyDefaults()` Funktion in `cms-static/admin/index.html` erweitert
- [x] Automatisches Setzen beim Erstellen neuer Events (CREATED, LAST-MODIFIED, SEQUENCE=0)
- [x] Logging zur Konsole für Debugging

### 3. preSave Hook ✅
- [x] Fallback-Logik im preSave Hook implementiert
- [x] CREATED Regel: Zukunft = jetzt, Vergangenheit = Event-Datum
- [x] LAST-MODIFIED: Immer auf aktuelles Datum/Zeit aktualisieren
- [x] SEQUENCE: Inkrementieren bei jeder Änderung (+1)
- [x] Validierung vor dem Speichern

### 4. iCal Feed ✅
- [x] CREATED-Feld in `feeds/mintfv-events.ical` hinzugefügt
- [x] LAST-MODIFIED-Feld hinzugefügt
- [x] SEQUENCE-Feld hinzugefügt
- [x] RFC 5545 konform formatiert
- [x] Fallback-Logik für Events ohne diese Felder

### 5. Bestehende Events migriert ✅
- [x] Ruby-Scripts erstellt:
  - [x] `_scripts/add_created_field.rb` (40 Events migriert)
  - [x] `_scripts/add_last_modified_field.rb` (41 Events hatten es bereits)
  - [x] `_scripts/add_sequence_field.rb` (41 Events hatten es bereits)
- [x] 9 vergangene Events: CREATED = Event-Datum
- [x] 31 zukünftige Events: CREATED = File-Datum

### 6. Dokumentation aktualisiert ✅
- [x] VERANSTALTUNGEN_ANLEITUNG.md erweitert
- [x] VERANSTALTUNGEN_TECHNIK.md erweitert
- [x] Neue Sektionen zu CREATED/LAST-MODIFIED/SEQUENCE-Implementierung

---

## 🧪 Jetzt bitte testen

### Test 1: Neue Veranstaltung im CMS erstellen

1. **Öffne das Decap CMS:**
   - Lokal: `http://localhost:4000/cms-static/admin/`
   - Online: `https://mintfv-cms.netlify.app/admin/`

2. **Erstelle eine neue Veranstaltung:**
   - Klicke auf Quick-Create Button (z.B. 🔧 für Offene Werkstatt)
   - Fülle die Pflichtfelder aus
   - **Achte auf das Feld "Erstellt am (automatisch)"**
   
3. **Prüfe folgendes:**
   - ✅ Ist das CREATED-Feld automatisch ausgefüllt?
   - ✅ Ist das LAST-MODIFIED-Feld automatisch ausgefüllt?
   - ✅ Ist das SEQUENCE-Feld auf 0 gesetzt?
   - ✅ Zeigen CREATED/LAST-MODIFIED das aktuelle Datum/Uhrzeit an?
   - ✅ Sind sie editierbar (falls du sie ändern möchtest)?

4. **Speichere die Veranstaltung**
   - Klicke auf "Veröffentlichen"
   - Prüfe in der Browser-Konsole: Siehst du `✅ CREATED gesetzt: ...`, `✅ LAST-MODIFIED gesetzt: ...` und `✅ SEQUENCE gesetzt: 0`?

5. **Öffne die gespeicherte Markdown-Datei in VS Code:**
   ```bash
   code _events/[neu-erstelltes-event].md
   ```
   - ✅ Sind die `created:`, `last_modified:` und `sequence:` Felder im Frontmatter vorhanden?
   - ✅ Haben CREATED/LAST-MODIFIED das korrekte Format `YYYY-MM-DD HH:mm`?
   - ✅ Sind die Werte identisch (beim ersten Speichern)?
   - ✅ Ist SEQUENCE = 0?

6. **Bearbeite das Event erneut:**
   - Ändere z.B. den Titel oder Beschreibung
   - Speichere erneut
   - **Prüfe:** Hat sich `last_modified` aktualisiert?
   - **Prüfe:** Ist `created` unverändert geblieben?
   - **Prüfe:** Ist `sequence` auf 1 erhöht worden?
   
7. **Bearbeite das Event ein drittes Mal:**
   - Mache eine weitere kleine Änderung
   - Speichere
   - **Prüfe:** Ist `sequence` jetzt bei 2?

---

### Test 2: iCal Feed validieren

1. **Baue die Website lokal:**
   ```bash
   bundle exec jekyll serve
   ```

2. **Öffne den iCal Feed:**
   ```
   http://localhost:4000/feeds/mintfv-events.ical
   ```

3. **Prüfe folgendes:**
   - ✅ Siehst du `CREATED:`, `LAST-MODIFIED:` und `SEQUENCE:` Zeilen in den VEVENTs?
   - ✅ Format korrekt: `CREATED:20251220T143600Z`, `LAST-MODIFIED:20251220T143600Z`, `SEQUENCE:0`?
   - ✅ Vergangene Events: CREATED = Event-Datum
   - ✅ Zukünftige Events: CREATED ≈ aktuelles Datum
   - ✅ LAST-MODIFIED ≥ CREATED (oder gleich)
   - ✅ SEQUENCE ist Integer (0, 1, 2, ...)?

4. **Validiere den Feed online:**
   - Gehe zu: https://icalendar.org/validator.html
   - Füge die URL ein: `http://localhost:4000/feeds/mintfv-events.ical`
   - ✅ Keine Fehler bezüglich CREATED, LAST-MODIFIED oder SEQUENCE Felder?

---

### Test 3: LAST-MODIFIED & SEQUENCE Aktualisierung testen

1. **Öffne ein bestehendes Event im CMS**
2. **Mache eine kleine Änderung** (z.B. ändere ein Wort in der Beschreibung)
3. **Speichere das Event**
4. **Prüfe in der Browser-Konsole:**
   - ✅ Siehst du `💾 preSave: LAST-MODIFIED aktualisiert auf ...`?
   - ✅ Siehst du `💾 preSave: SEQUENCE aktualisiert auf ...`?
5. **Öffne die Datei in VS Code:**
   - ✅ Hat sich `last_modified` aktualisiert?
   - ✅ Ist `created` unverändert?
   - ✅ Hat sich `sequence` erhöht (+1)?
6. **Prüfe den iCal Feed:**
   - ✅ Hat sich LAST-MODIFIED für dieses Event aktualisiert?
   - ✅ Hat sich SEQUENCE erhöht?
7. **Bearbeite das Event nochmal:**
   - Mache eine weitere Änderung
   - ✅ SEQUENCE sollte nochmal um 1 erhöht werden

---

### Test 4: Kalender-App Import

1. **Importiere den Feed in eine Kalender-App:**
   - **macOS:** Kalender.app → "Ablage" → "Neues Kalenderabonnement"
   - **Google Calendar:** Einstellungen → "Kalender hinzufügen" → "Von URL"
   - URL: Deine lokale oder GitHub Pages URL

2. **Prüfe folgendes:**
   - ✅ Events werden korrekt importiert
   - ✅ Keine Fehlermeldungen
   - ✅ Events erscheinen an den richtigen Daten

---

### Test 5: Bestehende Events prüfen

1. **Öffne ein vergangenes Event in VS Code:**
   ```bash
   code _events/2024-08-08-13-00-ferienpass.md
   ```

2. **Prüfe das CREATED-Feld:**
   - ✅ Vorhanden?
   - ✅ CREATED = Event-Datum (2024-08-08)?

3. **Prüfe das LAST-MODIFIED-Feld:**
   - ✅ Vorhanden?
   - ✅ LAST-MODIFIED ≥ CREATED?

4. **Öffne ein zukünftiges Event:**
   ```bash
   code _events/2026-01-06-16-00-offene-werkstatt.md
   ```

5. **Prüfe das CREATED-Feld:**
   - ✅ Vorhanden?
   - ✅ CREATED = File-Datum (ca. 2025-12-20)?

6. **Prüfe das LAST-MODIFIED-Feld:**
   - ✅ Vorhanden?
   - ✅ LAST-MODIFIED ≥ CREATED?

---

### Test 6: preSave Hook testen

1. **Öffne das CMS und bearbeite ein Event OHNE CREATED-Feld** (falls vorhanden)
2. **Speichere das Event**
3. **Prüfe die Browser-Konsole:**
   - ✅ Siehst du `💾 preSave: Setze CREATED auf ...`?
   - ✅ Siehst du `💾 preSave: LAST-MODIFIED aktualisiert auf ...`?
4. **Öffne die Datei in VS Code:**
   - ✅ Hat das Event jetzt ein CREATED-Feld?
   - ✅ Hat das Event ein LAST-MODIFIED-Feld?

---

## 📋 Test-Ergebnisse dokumentieren

Bitte notiere nach dem Testen:

- [ ] Test 1: Neue Veranstaltung - **Ergebnis:** ____________
- [ ] Test 2: iCal Feed - **Ergebnis:** ____________
- [ ] Test 3: LAST-MODIFIED & SEQUENCE Aktualisierung - **Ergebnis:** ____________
- [ ] Test 4: Kalender-App - **Ergebnis:** ____________
- [ ] Test 5: Bestehende Events - **Ergebnis:** ____________
- [ ] Test 6: preSave Hook - **Ergebnis:** ____________

**Probleme festgestellt?**
- Beschreibe sie hier: _________________________________
- Screenshots: _______________________________________

---

## 🚀 Next Steps nach erfolgreichem Test

Wenn alle Tests erfolgreich sind:

1. **Git Commit:**
   ```bash
   git add .
   git commit -m "feat: Add CREATED, LAST-MODIFIED & SEQUENCE for iCal RFC 5545 compliance
   
   - Add created, last_modified & sequence fields to Decap CMS config
   - Implement JavaScript auto-fill logic (CREATED/LAST-MODIFIED = now, SEQUENCE = 0)
   - Add preSave hook for validation and auto-update
   - LAST-MODIFIED: Auto-updates on every save
   - SEQUENCE: Auto-increments on every save (+1)
   - Extend iCal feed with all three RFC 5545 timestamp fields
   - Migrate existing events (40 CREATED, 41 had LAST-MODIFIED/SEQUENCE)
   - Update documentation (VERANSTALTUNGEN_TECHNIK.md, VERANSTALTUNGEN_ANLEITUNG.md)"
   ```

2. **Push zu GitHub:**
   ```bash
   git push origin main
   ```

3. **Deployment abwarten:**
   - GitHub Pages baut in ~2-5 Minuten
   - Prüfe: https://mintfv.github.io/feeds/mintfv-events.ical

4. **Produktions-Test:**
   - Validiere den Live-Feed
   - Teste Import in echte Kalender-App

---

## 📝 Hinweise

- **CREATED wird nur bei NEUEN Events automatisch gesetzt**
- **LAST-MODIFIED wird bei JEDER Speicherung aktualisiert**
- Bei Bearbeitung bestehender Events: CREATED bleibt unverändert, LAST-MODIFIED wird aktualisiert
- Falls ein Event kein CREATED hat: preSave Hook setzt es automatisch
- Falls ein Event kein LAST-MODIFIED hat: preSave Hook setzt es automatisch
- Migration kann jederzeit wiederholt werden (überspringt Events mit existierenden Feldern)
**Datum der Implementierung:** 20. Dezember 2025
**Implementiert von:** GitHub Copilot (Claude Sonnet 4.5)
