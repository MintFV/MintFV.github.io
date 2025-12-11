# Decap CMS Custom Features - Dokumentation

## Übersicht

Diese Dokumentation beschreibt die Custom-Features des Decap CMS für das MINT.FV Veranstaltungssystem.

## Dateien

### `event-types.json`
Zentrale Konfigurationsdatei für alle Veranstaltungstypen mit:
- Standard-Orte
- Standard-Zeiten
- Farben für UI
- Registrierungs-Defaults

Diese Datei ist die **Single Source of Truth** für Event-Type-Einstellungen.

### `custom-admin.css`
Zusätzliche CSS-Styles für:
- Quick-Create Buttons
- Event-Type-Farbindikator
- Listen-Farbcodierung

### `index.html`
Haupt-Admin-Interface mit Custom-JavaScript für:
- Quick-Create Buttons (4 Event-Typen)
- Automatische Defaults beim Erstellen
- Editor-Farbindikator
- preSave Hook als Fallback

## Custom Features

### 1. Quick-Create Buttons

**Was:** 4 farbcodierte Buttons für schnelles Erstellen von Events
**Warum Custom:** Decap bietet keine API für Custom UI in Collection-Listen
**Implementierung:** `addQuickCreateButtons()` in index.html

### 2. Automatische Defaults

**Was:** Event-Type-spezifische Vorausfüllung von Feldern
**Warum Custom:** Decap unterstützt keine bedingten/dynamischen Defaults
**Implementierung:** 
- `applyDefaults()` setzt Werte beim Erstellen
- `preSave` Hook als Fallback beim Speichern

### 3. Editor-Farbindikator

**Was:** 4px farbige Leiste am oberen Bildschirmrand
**Warum Custom:** Keine Dynamic-Styling-API für Editor
**Implementierung:** `colorizeEditor()` mit eigenem DOM-Element

### 4. Listen-Farbcodierung

**Was:** Farbige Balken an Event-Einträgen in der Liste
**Warum Custom:** Keine Customization-API für Collection-Listen
**Implementierung:** CSS ::before Pseudo-Elemente

## Warum Custom-JavaScript?

### Decap CMS Limitationen

Decap CMS unterstützt **NICHT**:
- ❌ Bedingte Felder basierend auf anderen Werten
- ❌ Dynamische Defaults basierend auf anderen Feldern
- ❌ `onCreate` oder `onFieldChange` Hooks
- ❌ Programmatische Feld-Updates via API
- ❌ Custom UI in Listen oder Editor

### Legitime Custom-Lösungen

Alle Custom-JavaScript-Funktionen lösen **echte Probleme**, die Decap nicht nativ lösen kann:

1. **Quick-Create**: Keine Alternative
2. **Automatische Defaults**: Nur statische Defaults möglich
3. **Event Type Handler**: Keine Navigation/Routing-Hooks
4. **React Input Updates**: Keine `setFieldValue()` API
5. **Dynamic Styling**: Nur Preview-Styling möglich

## Wartung

### Event-Type hinzufügen

1. Eintrag in `event-types.json` hinzufügen
2. Option in `config.yml` hinzufügen (collections.events.fields.event_type)
3. Farbe in `custom-admin.css` hinzufügen (optional)

### Defaults ändern

Nur `event-types.json` editieren - wird automatisch geladen.

## Technische Details

### preSave Hook

```javascript
CMS.registerEventListener({
  name: 'preSave',
  handler: ({ entry }) => {
    // Fallback für fehlende Location
    const eventType = entry.getIn(['data', 'event_type']);
    const location = entry.getIn(['data', 'location']);
    
    if (!location && eventType && EVENT_TYPE_DEFAULTS[eventType]) {
      const defaults = EVENT_TYPE_DEFAULTS[eventType];
      return entry.setIn(['data', 'location'], defaults.location);
    }
    
    return entry;
  }
});
```

### URL-Parameter Support

Quick-Create Buttons können URL-Parameter nutzen:
```javascript
const params = new URLSearchParams();
params.append('location', config.location);
window.location.hash = `#/collections/events/new?${params}`;
```

**Limitation:** Funktioniert nur für einfache String-Felder, nicht für Select-Widgets.

## Version

**Aktuelle Version:** 4.0.0 (Optimiert)
**Letzte Änderung:** 11. Dezember 2025

## Änderungshistorie

### v4.0.0 (11.12.2025)
- ✅ Konfiguration in `event-types.json` ausgelagert
- ✅ CSS in `custom-admin.css` ausgelagert
- ✅ `initDecapCMS()` Polling entfernt
- ✅ preSave Hook als Fallback hinzugefügt
- ✅ URL-Parameter-Support integriert
- ✅ Bessere Kommentare und Dokumentation

### v3.8.1 (vorher)
- Inline-Konfiguration
- Inline-CSS
- Polling für CMS-Init
- Keine preSave-Fallbacks
