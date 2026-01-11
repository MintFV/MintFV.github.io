# 📚 Dokumentations-Übersicht

Diese Datei bietet einen strukturierten Überblick über alle Dokumentationen im Projekt.

## 🎯 Für Redakteure (Content Management)

Diese Dokumentationen sind für **nicht-technische Benutzer** gedacht, die Veranstaltungen pflegen:

| Dokument | Zweck | Zielgruppe |
|----------|-------|------------|
| [VERANSTALTUNGEN_ANLEITUNG.md](VERANSTALTUNGEN_ANLEITUNG.md) | **Hauptanleitung** für Decap CMS - Schritt-für-Schritt Anweisungen zum Erstellen/Bearbeiten von Events | Redakteure, Vereinsmitglieder |

## 🛠️ Für Entwickler (Technisch)

### Hauptdokumentationen

| Dokument | Zweck | Wichtigkeit |
|----------|-------|-------------|
| [README.md](README.md) | **Haupteinstieg** - Installation, Entwicklung, Quick Start | ⭐⭐⭐ Pflicht |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | **Token System** - CSS-Variablen, Farben, Event-Type Synchronisation | ⭐⭐⭐ Bei Styling-Änderungen |
| [ADR-CSS-REFACTOR.md](ADR-CSS-REFACTOR.md) | **Architecture Decision Record** - Warum CSS-Variablen, Two-Token Architecture | ⭐⭐ Kontext für Design-Entscheidungen |
| [VERANSTALTUNGEN_TECHNIK.md](VERANSTALTUNGEN_TECHNIK.md) | **Technische Tiefe** - Event-System Backend, Feeds, Zeitfilterung | ⭐⭐ Bei Event-System-Änderungen |

### Spezialisierte Dokumentationen

| Dokument | Zweck |
|----------|-------|
| [tests/TESTING.md](tests/TESTING.md) | **Testing & Linting** - Playwright Visual Tests, CSS Linting, CI/CD |
| [TESTING.md](TESTING.md) | Verweis auf [tests/TESTING.md](tests/TESTING.md) (Redirect) |
| [docs/NAME_ASYMMETRY.md](docs/NAME_ASYMMETRY.md) | Erklärung der bewussten Namen-Unterschiede zwischen Jekyll und CMS |

### Archivierte Dokumentation

Historische und abgeschlossene Dokumente befinden sich in [docs/archive/](docs/archive/):

- `PLAN_COMPLETED.md` - Test-Infrastruktur Setup (abgeschlossen)
- `CREATED_TESTING.md` - Testing-Checklist CREATED/LAST-MODIFIED (abgeschlossen)
- `anforderungen.md` - Ursprüngliche Anforderungsanalyse (historisch)
- `decap-copilot-prompt.md` - Interne Entwicklungsdokumentation

**Hinweis:** Diese Dateien sind nicht mehr wartungsrelevant, werden aber als Referenz aufbewahrt.

---

## 🚀 Schnellstart für neue Entwickler

1. **Start:** [README.md](README.md) lesen - Installation & Grundlagen
2. **Styling:** [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Token System verstehen
3. **Events:** [VERANSTALTUNGEN_TECHNIK.md](VERANSTALTUNGEN_TECHNIK.md) - Event-Architektur
4. **Testing:** [tests/TESTING.md](tests/TESTING.md) - Tests ausführen

## 🎨 Event-Type Änderungen (Farben, Emojis)

Bei Änderungen an Event-Types **MÜSSEN** 3 Dateien synchron gehalten werden:

1. `_data/event_types.yml` (Single Source of Truth)
2. `cms-static/admin/event-types.json` (CMS Defaults)
3. `cms-static/admin/custom-admin.css` (CSS-Variablen)

**Details:** Siehe [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#synchronisations-anforderungen)

---

## 📝 Dokumentations-Philosophie

### Was gehört wohin?

- **README.md** - Installation, Entwicklung, Quick Reference
- **DESIGN_SYSTEM.md** - Styling, Tokens, Farben, Patterns
- **ADR-*.md** - Architecture Decision Records (Warum-Fragen)
- **VERANSTALTUNGEN_*.md** - Event-System spezifisch
- **tests/TESTING.md** - Alles zu Testing & Linting
- **docs/** - Spezialisierte Themen & Archiv

### Wartung dieser Übersicht

Diese Datei sollte aktualisiert werden, wenn:
- Neue Hauptdokumentation hinzugefügt wird
- Dokumentation archiviert wird
- Strukturelle Änderungen erfolgen

---

**Stand:** Januar 2026  
**Letztes Update:** Konsolidierung & Bereinigung der Dokumentation
