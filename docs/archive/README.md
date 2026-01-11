# 📦 Archiv - Historische Dokumentation

Dieses Verzeichnis enthält **historische und interne Entwicklungsdokumentation**, die nicht mehr Teil der aktiven Projektwartung ist, aber als Referenz aufbewahrt wird.

## Archivierte Dateien

### PLAN_COMPLETED.md
- **Zweck:** Dokumentation des Test-Infrastruktur-Setups
- **Status:** ✅ Abgeschlossen (Dezember 2025)
- **Inhalt:** Details zur Reorganisation der Test-Dateien, CI/CD-Pipelines und Docker-Support
- **Warum archiviert:** Historische Dokumentation eines abgeschlossenen Projekts. Aktuelle Info in [tests/TESTING.md](../../tests/TESTING.md)

### CREATED_TESTING.md
- **Zweck:** Testing-Checklist für CREATED/LAST-MODIFIED/SEQUENCE Implementierung
- **Status:** ✅ Implementierung abgeschlossen
- **Inhalt:** Detaillierte Checkliste mit Testanweisungen für die iCal-Synchronisationsfelder
- **Warum archiviert:** Einmalige Implementierungsaufgabe abgeschlossen. Feature ist nun Teil der Standard-Workflows

### anforderungen.md
- **Zweck:** Ursprüngliche Anforderungsanalyse für die Website
- **Status:** Historisches Dokument (Projektbeginn 2025)
- **Inhalt:** Initiale Anforderungen, Veranstaltungstypen, CMS-Auswahl, Technologie-Entscheidungen
- **Warum archiviert:** Anforderungen sind nun in produktionsbereiten Code umgesetzt. Dokumentiert den Entstehungsprozess

### decap-copilot-prompt.md
- **Zweck:** Interne Entwicklungsdokumentation für Copilot/KI-Assistenten
- **Status:** Entwicklungs-Hilfsdokument
- **Inhalt:** Detaillierter Prompt mit Projektkontext, Veranstaltungstypen, Architekturentscheidungen
- **Warum archiviert:** Interne Entwicklungsdokumentation. Nicht relevant für End-User oder Redakteure

---

## 📖 Aktuelle Dokumentation

Die **aktuelle, wartungsrelevante Dokumentation** befindet sich im Root und in spezialisierten Verzeichnissen:

### Für Redakteure (Content-Management)
- [VERANSTALTUNGEN_ANLEITUNG.md](../../VERANSTALTUNGEN_ANLEITUNG.md) - Anleitung für Decap CMS
- [VERANSTALTUNGEN_TECHNIK.md](../../VERANSTALTUNGEN_TECHNIK.md) - Technische Details

### Für Entwickler (Code & Styling)
- [README.md](../../README.md) - Hauptdokumentation mit Installation & Workflows
- [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md) - Token System & Styling-Architektur
- [ADR-CSS-REFACTOR.md](../../ADR-CSS-REFACTOR.md) - Architecture Decision Record für CSS
- [tests/TESTING.md](../../tests/TESTING.md) - Testing & Linting Dokumentation
- [docs/NAME_ASYMMETRY.md](../NAME_ASYMMETRY.md) - Event-Type Namen-Konventionen

---

**Stand:** Januar 2026  
**Wartung:** Dieses Archiv sollte nicht weiter wachsen. Neue historische Dokumente sollten nach docs/archive/YYYY/ sortiert werden.
