# Testing & Linting - Dokumentation

Alle Test- und Linting-Konfigurationen befinden sich im Verzeichnis [`tests/`](tests/).

**Vollständige Dokumentation:** [`tests/TESTING.md`](tests/TESTING.md)

## 🚀 Quick Start

```bash
# CSS Linting
npm run lint:css

# Visual Regression Tests
npm run test:visual

# Update Baselines (nach bewussten CSS-Änderungen)
npm run test:visual:update

# Docker-basierte Tests
npm run test:visual:docker
```

## 📂 Struktur

```
tests/
├── TESTING.md                           # Vollständige Dokumentation
├── .stylelintrc.json                    # CSS Linting Konfiguration
├── playwright.config.ts                 # Playwright Konfiguration
├── run-visual-tests.sh                  # Test-Skript (mit Ergebnis-Ausgabe)
├── update-visual-baselines.sh           # Baseline-Update-Skript
├── visual.spec.ts                       # Test-Spezifikation (3 Pages)
├── visual.spec.ts-snapshots/            # Baseline-Screenshots
│   ├── page--veranstaltungen--chromium-darwin.png
│   ├── page--veranstaltungen-zukunft--chromium-darwin.png
│   └── page--veranstaltungen-archiv--chromium-darwin.png
└── package.json                         # Test Dependencies & Scripts
```

## 📖 Root-Level Wrapper

Die Skripte im Root-Verzeichnis sind Wrapper und delegieren an `tests/`:

- **[run-visual-tests.sh](run-visual-tests.sh)** → `tests/run-visual-tests.sh`
- **[update-visual-baselines.sh](update-visual-baselines.sh)** → `tests/update-visual-baselines.sh`
- **[.stylelintrc.json](.stylelintrc.json)** → `tests/.stylelintrc.json`
- **[playwright.config.ts](playwright.config.ts)** → `tests/playwright.config.ts`
- **[package.json](package.json)** → delegiert an `tests/package.json`

Dies erlaubt einfache Aufrufe wie `./run-visual-tests.sh` oder `npm run lint:css` aus dem Root.

---

**Siehe auch:** [`tests/TESTING.md`](tests/TESTING.md) für vollständige Dokumentation.
