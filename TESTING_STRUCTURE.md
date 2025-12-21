# 📁 Struktur Testing & Linting

## Übersicht

Das Testing & Linting System ist in das Verzeichnis `tests/` organisiert, mit Root-Wrappern für einfache Bedienung.

## 📂 Verzeichnisstruktur

```
MintFV.github.io/
├── tests/                                    # ← Test-System
│   ├── TESTING.md                           # Vollständige Dokumentation
│   ├── .stylelintrc.json                    # CSS Linting Konfiguration
│   ├── playwright.config.ts                 # Playwright Konfiguration
│   ├── run-visual-tests.sh                  # Test-Ausführungsskript
│   ├── update-visual-baselines.sh           # Baseline-Update-Skript
│   ├── visual.spec.ts                       # Test-Spezifikation
│   ├── visual.spec.ts-snapshots/            # Baseline-Screenshots
│   │   ├── page--veranstaltungen--chromium-darwin.png
│   │   ├── page--veranstaltungen-zukunft--chromium-darwin.png
│   │   └── page--veranstaltungen-archiv--chromium-darwin.png
│   ├── node_modules/                        # Dependencies
│   ├── package.json                         # Test-Dependencies
│   └── package-lock.json
│
├── .stylelintrc.json                        # Root-Verweis → tests/.stylelintrc.json
├── playwright.config.ts                     # Root-Verweis → tests/playwright.config.ts
├── run-visual-tests.sh                      # Root-Wrapper → tests/run-visual-tests.sh
├── update-visual-baselines.sh               # Root-Wrapper → tests/update-visual-baselines.sh
├── package.json                             # Root-Delegator (npm scripts)
│
├── TESTING.md                               # Übersichts-Link → tests/TESTING.md
├── TESTING_README.md                        # Diese Datei
│
└── ...weitere Projektdateien...
```

## 🚀 Verwendung

### Aus dem Root-Verzeichnis:

```bash
# Linting
npm run lint:css

# Tests
npm run test:visual
npm run test:visual:update
npm run test:visual:docker

# Oder direkt mit Skripten
./run-visual-tests.sh
./update-visual-baselines.sh
```

### Aus dem tests/-Verzeichnis:

```bash
cd tests

# Linting
npm run lint:css

# Tests
npm run test:visual
npm run test:visual:update

# Oder Skripte
./run-visual-tests.sh
./update-visual-baselines.sh
```

## 📄 Datei-Rollen

### In `tests/` (Primär):

| Datei | Zweck |
|-------|-------|
| `TESTING.md` | 📖 Vollständige Dokumentation mit allen Details |
| `.stylelintrc.json` | ⚙️ CSS Linting Regeln |
| `playwright.config.ts` | ⚙️ Browser & Test-Konfiguration |
| `visual.spec.ts` | 🧪 Test-Spezifikation (3 Pages) |
| `visual.spec.ts-snapshots/` | 📸 Baseline-Screenshots |
| `run-visual-tests.sh` | ▶️ Test-Ausführung mit Ergebnis-Anzeige |
| `update-visual-baselines.sh` | 🔄 Baseline-Aktualisierung |
| `package.json` | 📦 Dependencies & npm Scripts |
| `node_modules/` | 📚 Installierte Packages |

### Im Root (Wrapper/Delegator):

| Datei | Zweck |
|-------|-------|
| `.stylelintrc.json` | 🔗 Verweis zu `tests/.stylelintrc.json` |
| `playwright.config.ts` | 🔗 Verweis zu `tests/playwright.config.ts` |
| `run-visual-tests.sh` | 🔗 Wrapper zu `tests/run-visual-tests.sh` |
| `update-visual-baselines.sh` | 🔗 Wrapper zu `tests/update-visual-baselines.sh` |
| `package.json` | 🔗 Delegiert npm Scripts an `tests/` |
| `TESTING.md` | 📍 Umleitung zu `tests/TESTING.md` |
| `TESTING_README.md` | 📖 Struktur-Übersicht (diese Datei) |

## 🔄 Delegierungs-Mechanismus

Alle npm-Scripts im Root delegieren an `tests/`:

```json
// Root package.json
{
  "scripts": {
    "lint:css": "cd tests && npm run lint:css",
    "test:visual": "cd tests && npm run test:visual",
    "test:visual:update": "cd tests && npm run test:visual:update",
    "test:visual:docker": "cd tests && npm run test:visual:docker"
  }
}
```

Ebenso die Shell-Skripte:

```bash
#!/bin/bash
# run-visual-tests.sh (Root)
SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"
cd "$SCRIPT_DIR/tests" || exit 1
exec ./run-visual-tests.sh "$@"
```

## ✅ Vorteile dieser Struktur

✅ **Saubere Separation:** Alle Test-Tools in einem Verzeichnis  
✅ **Einfache Verwendung:** Scripts vom Root aus nutzbar  
✅ **Wartbar:** Zentrale node_modules, ein package.json  
✅ **Modular:** Tests können isoliert gearbeitet oder überwacht werden  
✅ **Migrierbar:** Tests komplett als Einheit verschoben/gelöscht  
✅ **Dokumentiert:** Struktur ist selbsterklärend  

## 📖 Dokumentation

- **[TESTING.md](TESTING.md)** → Umleitung zu [tests/TESTING.md](tests/TESTING.md)
- **[TESTING_README.md](TESTING_README.md)** → Diese Struktur-Übersicht
- **[tests/TESTING.md](tests/TESTING.md)** → 🏆 Vollständige Dokumentation mit:
  - Alle Tools & Konfigurationen
  - Quick-Start & Workflow
  - Docker Support
  - CI/CD Integration
  - Troubleshooting

---

**Zuletzt aktualisiert:** 21. Dezember 2025
