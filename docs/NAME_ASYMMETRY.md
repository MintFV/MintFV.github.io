# ⚠️ Kritische Design-Entscheidung: Name-Asymmetrie

## Das Problem

Die **Namen** der Event-Typen sind **NICHT** synchron zwischen `_data/event_types.yml` und `cms-static/admin/event-types.json` – und das ist **absolut gewollte Designentscheidung**!

## Warum das Sinn macht

| System | Namen-Format | Grund |
|--------|--------------|-------|
| **Jekyll** (`_data/event_types.yml`) | Länger, aussagekräftig: `"Ferienpass Aktion"` | Bessere User-Experience im Event-Display |
| **CMS** (`cms-static/admin/event-types.json`) | Kürzer, minimal: `"Ferienpass"` | Wird für Dateiname-Generierung verwendet im Decap Slug |

### Beispiel der Asymmetrie

```yaml
# _data/event_types.yml (Jekyll)
ferienpass:
  name: "Ferienpass Aktion"      # ← Länger
  color: "#FFF4E6"
  emoji: "🎪"
```

```json
// cms-static/admin/event-types.json (CMS)
"ferienpass": {
  "name": "Ferienpass",           // ← Kürzer!
  "color": "#FFF4E6",
  "emoji": "🎪"
}
```

Dies führt dazu, dass:
- Jekyll zeigt: `"🎪 Ferienpass Aktion"` (schön, aussagekräftig)
- CMS-Slug wird: `2025-12-02-16-00-ferienpass-event-title.md` (kurz, sauber)

## Was MUSS synchron sein ✅

- **Farben**: `color: "#FFF4E6"`
- **Emojis**: `emoji: "🎪"`
- **CSS-Variablen**: `--event-color-ferienpass: #FFF4E6;`

## Was NICHT synchron sein darf ❌

- **Namen**: Diese sind bewusst unterschiedlich!

## Validierung

Der Token-Validator (`_scripts/validate-tokens.js`) wurde **explizit** so konfiguriert, dass er:

✅ **Prüft:**
- Farben zwischen YAML, JSON und CSS
- Emojis zwischen YAML und JSON
- CSS-Variablen in `custom-admin.css`

❌ **NICHT prüft:**
- Namen-Felder (sind absichtlich unterschiedlich)

```bash
# Validator ausführen:
npm run validate:tokens    # aus tests/ Verzeichnis
```

## Wenn Namen-Felder "falsch" aussehen

Wenn Sie sehen, dass die Namen in YAML und JSON unterschiedlich sind:

**Das ist NICHT falsch. Das ist die Lösung.**

Ändern Sie die Namen **nicht**, um sie zu synchronisieren – das würde das CMS-Dateiname-System kaputt machen!

## Hintergrund: Warum wurde diese Lösung gewählt?

Siehe: [ADR-CSS-REFACTOR.md](../ADR-CSS-REFACTOR.md#event-type-farben-3-file-sync-pattern)

TL;DR:
- YAML = Single Source of Truth (Redakteure ändern hier)
- JSON = CMS-Konfiguration (braucht Konsistenz für Defaults)
- CSS = Admin-UI Styling (muss autark funktionieren)
- **Namen-Asymmetrie wurde akzeptiert**, weil es zwei verschiedene Systeme mit verschiedenen Anforderungen gibt
