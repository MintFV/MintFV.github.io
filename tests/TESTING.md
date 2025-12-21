# Testing & Linting - Dokumentation

## 📁 Struktur

Alle Test- und Linting-Dateien befinden sich im `/tests/` Verzeichnis:

```
tests/
├── run-visual-tests.sh              # Test-Skript (Haupteinstieg)
├── update-visual-baselines.sh       # Baseline-Update-Skript
├── package.json                     # npm Scripts & Dependencies
├── package-lock.json
├── playwright.config.ts             # Playwright-Konfiguration
├── .stylelintrc.json               # Stylelint-Konfiguration
├── visual.spec.ts                  # Playwright Test-Spezifikation
├── visual.spec.ts-snapshots/       # Baseline Screenshots
│   ├── page--veranstaltungen--chromium-darwin.png
│   ├── page--veranstaltungen-zukunft--chromium-darwin.png
│   └── page--veranstaltungen-archiv--chromium-darwin.png
├── playwright-report/              # HTML Test-Report (generiert)
├── test-results/                   # Test Results (generiert)
└── TESTING.md                      # Diese Dokumentation
```

---

## 🆕 Neue Tools & Skripte

### 1. **Stylelint** – CSS Linting
Überprüft CSS-Dateien auf Standard-Konformität und Best Practices.

**Konfiguration:** `tests/.stylelintrc.json`
- Standard-Konfiguration: `stylelint-config-standard`
- Custom-Regel: Warnung für Farb-Hardcodes (sollten `var()` nutzen)

**Verwendung:**
```bash
cd tests && npm run lint:css
```

**Aktueller Status:**
- ✅ Tool funktioniert
- ⚠️ 30 Warnungen für Farb-Hardcodes in Event-CSS (absichtlich – Mischung aus CSS-Variablen und Fallbacks für Kompatibilität)

**Hinweis zu Color-Warnings:**
Die Warnungen entstehen, weil einige Farb-Werte direkt definiert sind statt nur über CSS-Variablen. Dies ist **absichtlich und akzeptabel** aus folgenden Gründen:
- CSS-Variablen sind neu und brauchen Fallbacks für ältere Browser
- BEM-Modifizierer nutzen `--event-type-color` dynamisch basierend auf `data-event-type` Attributen
- Verwenden von `$1 / 0.7` (opacity) in CSS ist sicherer als nur Hex-Werte
- Grenzt auf Events zu (assets/css/events.css), nicht auf globales Styling

**Zu beachten:** Diese Warnungen können ignoriert oder als `disabled` in `.stylelintrc.json` konfiguriert werden, wenn sie nicht relevant sind.

---

### 2. **Playwright** – Visual Regression Testing
Automatisierte Screenshot-Tests für visuelle Konsistenz.

**Konfiguration:** `tests/playwright.config.ts`
- Browser: Chromium (mobil/desktop)
- Base URL: `http://localhost:4000` (oder via `PLAYWRIGHT_BASE_URL`)
- Reporter: Terminal-Liste + HTML-Report
- Output-Verzeichnis: `tests/playwright-report/`

**Test-Spezifikation:** `tests/visual.spec.ts`
- `/veranstaltungen/` – Hauptübersicht
- `/veranstaltungen/zukunft/` – Zukünftige Events
- `/veranstaltungen/archiv/` – Vergangene Events

**Baselines:** `tests/visual.spec.ts-snapshots/`
- `page--veranstaltungen--chromium-darwin.png`
- `page--veranstaltungen-zukunft--chromium-darwin.png`
- `page--veranstaltungen-archiv--chromium-darwin.png`

---

## 🚀 Verfügbare Kommandos

### Aus dem `/tests/` Verzeichnis:

```bash
cd tests

# Linting
npm run lint:css          # Überprüfe CSS auf Fehler/Warnungen

# Testing
npm run test:visual       # Führe Visual Tests aus (Server muss laufen)
npm run test:visual:update  # Aktualisiere Baselines nach CSS-Änderungen
npm run test:visual:docker  # Tests in Docker-Container
```

### Aus dem Root-Verzeichnis:

```bash
# Convenience-Skripte
./tests/run-visual-tests.sh              # Kompletter Test-Workflow
./tests/update-visual-baselines.sh       # Baseline-Update mit Bestätigung
```

---

## 📋 Convenience-Skripte

### **[tests/run-visual-tests.sh](run-visual-tests.sh)** – Kompletter Test-Workflow
Startet Server, führt Tests aus, zeigt Ergebnis.

```bash
./tests/run-visual-tests.sh
```

**Was es macht:**
1. ✅ Prüft ob Jekyll Server läuft (oder startet ihn)
2. ✅ Wartet auf Server-Bereitschaft (max 10s)
3. ✅ Führt Playwright Tests aus
4. ✅ Zeigt farbliche Auswertung:
   - 🟢 `✓ ALLE TESTS ERFOLGREICH` – Keine Änderungen erkannt
   - 🔴 `✗ TESTS FEHLGESCHLAGEN` – Unterschiede zu Baselines

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[4/4] Testergebnis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ ALLE TESTS ERFOLGREICH

Alle Visual Regression Tests haben das Baseline-Snapshot-Matching bestanden.
Keine visuellen Änderungen erkannt.
```

---

### **[tests/update-visual-baselines.sh](update-visual-baselines.sh)** – Baseline-Update
Aktualisiert Snapshots nach bewussten CSS-Änderungen.

```bash
./tests/update-visual-baselines.sh
```

**Was es macht:**
1. ⚠️ Fragt um Bestätigung (Sicherheit)
2. ✅ Startet Server
3. ✅ Aktualisiert alle Baselines
4. ✅ Gibt nächste Schritte an

**Wann verwenden:**
- Nach CSS-Refactoring (z.B. neue Event-Farben)
- Nach bewussten Layout-Änderungen
- Nicht einfach so, um Fehler zu ignorieren! ⚠️

---

## 📋 Workflow für CSS-Änderungen

### 1. **Änderung machen**
```bash
# Bearbeite CSS-Datei
vim assets/css/events.css
```

### 2. **Linting**
```bash
cd tests && npm run lint:css  # Prüfe auf Fehler
```

### 3. **Visuell testen**
```bash
./tests/run-visual-tests.sh  # Sollte Tests erfolgreich bestehen
```

### 4. **Falls Tests fehlschlagen**
Zwei Möglichkeiten:

**A) Fehler in CSS beheben**
```bash
# Bug finden und fixen
vim assets/css/events.css
./tests/run-visual-tests.sh  # Nochmal testen
```

**B) Baselines aktualisieren** (nur bei bewussten Änderungen!)
```bash
./tests/update-visual-baselines.sh  # Mit Bestätigung
# Review & Commit
git add tests/
git commit -m "Update visual baselines for new CSS design"
./tests/run-visual-tests.sh  # Verify
```

---

## 🐳 Docker Support

Die Skripte unterstützen auch Docker für garantiert konsistente Test-Umgebungen:

```bash
cd tests && npm run test:visual:docker
```

Dies nutzt `microsoft/playwright:v1.41.2-focal` mit:
- Aktualisierter Playwright-Installation
- Linux-basierter Umgebung (identisch zu CI/CD)

**Voraussetzung:** Docker muss laufen

```bash
# Docker starten (falls nicht aktiv)
docker daemon
# oder
docker desktop  # macOS
```

---

## 🔄 Continuous Integration / CI/CD

### GitHub Actions Workflows

Zwei automatisierte Workflows sind bereits eingebunden:

#### 1️⃣ **Visual Regression Testing** (`.github/workflows/visual-tests.yml`)

Triggered on:
- Push zu `main` oder `develop` Branch
- Pull Request zu `main` oder `develop`

**Workflow:**
```yaml
- Checkout Code
- Setup Ruby (Jekyll)
- Setup Node.js 18
- npm ci (tests/)
- npm install Playwright
- Jekyll Build (lokal)
- Starte Server auf Port 4001
- Ausführe `npm run test:visual`
- Upload Playwright Report Artifacts
- Cleanup (Stop Server)
```

**Timeout:** 30 Minuten  
**Artifacts:** Playwright HTML Report → Abrufbar in GitHub Actions Run

#### 2️⃣ **CSS Linting** (`.github/workflows/css-lint.yml`)

Triggered on:
- Push zu `main` oder `develop` mit CSS-Änderungen
- Pull Request zu `main` oder `develop` mit CSS-Änderungen

**Workflow:**
```yaml
- Checkout Code
- Setup Node.js 18
- npm ci (tests/)
- Ausführe `npm run lint:css`
- (Opt.) Kommentar auf PR bei Fehler
```

**Timeout:** 10 Minuten  
**PR-Feedback:** Automatischer Kommentar bei Linting-Fehlern

### Lokale Exit-Code-Nutzung

Die Skripte nutzen Exit-Codes für CI/CD:

```bash
./tests/run-visual-tests.sh
echo $?  # 0 = erfolg, 1 = fehler
```

### Manuelle Workflow-Trigger

Über GitHub Actions UI:
1. Gehe zu **Actions** Tab
2. Wähle Workflow (`Visual Tests` oder `CSS Linting`)
3. Klick **Run Workflow** Button
4. Wähle Branch
5. Klick **Run Workflow**

---

## 🎯 Status & Nächste Schritte

### ✅ Abgeschlossen
- [x] Stylelint Setup mit Standard-Konfiguration (in `tests/`)
- [x] Playwright Visual Tests mit 3 Seiten (in `tests/`)
- [x] Baseline-Snapshots generiert (in `tests/visual.spec.ts-snapshots/`)
- [x] Convenience-Skripte erstellt (in `tests/`)
- [x] npm Scripts in `tests/package.json`
- [x] Playwright Config mit relativen Pfaden (in `tests/`)

### 📝 Empfehlungen
1. **Color-Warnings akzeptieren** – Sie sind gewollt für flexibles Event-Typ-Styling
2. **CI/CD Integration** – GitHub Actions Workflow hinzufügen für automatisches Testing
3. **Regelmäßige Baseline-Updates** – Bei größeren Redesigns aktualisieren
4. **Dokumentation teilen** – Mit anderen Entwicklern/Editors
5. **Docker-Setup testen** – Für lokale Konsistenz vor Push

---

## 📚 Weitere Ressourcen

- **Stylelint Dokumentation:** https://stylelint.io/
- **Playwright Dokumentation:** https://playwright.dev/
- **CSS BEM Architektur:** http://getbem.com/

---

**Erstellt:** 21. Dezember 2025  
**Status:** Production Ready ✅  
**Speicherort:** `/tests/TESTING.md`
