#!/usr/bin/env node

/**
 * Token Sync Validator
 *
 * Validiert, dass die 3-Datei-Sync für Event-Typ-Farben konsistent ist:
 * 1. _data/event_types.yml       (Primary - Jekyll, längere Namen)
 * 2. cms-static/admin/event-types.json  (Replica - CMS Config, kürzere Namen für Dateigenerierung)
 * 3. cms-static/admin/custom-admin.css  (Replica - CMS Styling)
 *
 * WICHTIG: Namen müssen NICHT gleich sein! Farben, Emojis und CSS-Variablen müssen aber synchron sein.
 *
 * Exit Code: 0 = OK, 1 = Fehler
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const REPO_ROOT = path.resolve(__dirname, '..');
const FILES = {
  yml: path.join(REPO_ROOT, '_data/event_types.yml'),
  json: path.join(REPO_ROOT, 'cms-static/admin/event-types.json'),
  css: path.join(REPO_ROOT, 'cms-static/admin/custom-admin.css')
};

let hasErrors = false;

console.log('🔍 Token Sync Validator started...\n');

// ============================================
// 1. Lade YAML
// ============================================
let eventTypesYml;
try {
  const ymlContent = fs.readFileSync(FILES.yml, 'utf-8');
  eventTypesYml = yaml.load(ymlContent);
  console.log('✅ _data/event_types.yml geladen');
} catch (error) {
  console.error(`❌ Fehler beim Laden von event_types.yml: ${error.message}`);
  process.exit(1);
}

// ============================================
// 2. Lade JSON
// ============================================
let eventTypesJson;
try {
  const jsonContent = fs.readFileSync(FILES.json, 'utf-8');
  eventTypesJson = JSON.parse(jsonContent);
  console.log('✅ cms-static/admin/event-types.json geladen');
} catch (error) {
  console.error(`❌ Fehler beim Laden von event-types.json: ${error.message}`);
  process.exit(1);
}

// ============================================
// 3. Lade CSS
// ============================================
let cssContent;
try {
  cssContent = fs.readFileSync(FILES.css, 'utf-8');
  console.log('✅ cms-static/admin/custom-admin.css geladen\n');
} catch (error) {
  console.error(`❌ Fehler beim Laden von custom-admin.css: ${error.message}`);
  process.exit(1);
}

// ============================================
// 4. Validiere Konsistenz
// ============================================

console.log('📋 Validiere Event-Type Konsistenz...\n');

// 4.1 Prüfe alle Keys
const ymlKeys = Object.keys(eventTypesYml);
const jsonKeys = Object.keys(eventTypesJson);

if (JSON.stringify(ymlKeys.sort()) !== JSON.stringify(jsonKeys.sort())) {
  console.error('❌ FEHLER: Keys in YAML und JSON stimmen nicht überein!');
  console.error(`   YAML Keys: ${ymlKeys.join(', ')}`);
  console.error(`   JSON Keys: ${jsonKeys.join(', ')}`);
  hasErrors = true;
}

// 4.2 Validiere jeden Event-Type
for (const eventType of ymlKeys) {
  const ymlData = eventTypesYml[eventType];
  const jsonData = eventTypesJson[eventType];

  if (!jsonData) {
    console.error(`❌ ${eventType}: Fehlt in event-types.json`);
    hasErrors = true;
    continue;
  }

  // Prüfe Farbe
  if (ymlData.color !== jsonData.color) {
    console.error(`❌ ${eventType}: Farbe stimmt nicht überein`);
    console.error(`   YAML: ${ymlData.color}`);
    console.error(`   JSON: ${jsonData.color}`);
    hasErrors = true;
  } else {
    console.log(`   ✅ ${eventType}: color = ${ymlData.color}`);
  }

  // Prüfe CSS Variable
  const cssVarName = `--event-color-${eventType}`;
  const cssVarPattern = new RegExp(`${cssVarName}:\\s*${ymlData.color.replace('#', '\\#')};`);

  if (!cssVarPattern.test(cssContent)) {
    console.error(`❌ ${eventType}: CSS-Variable ${cssVarName} nicht oder falsch definiert`);
    console.error(`   Erwartet: ${cssVarName}: ${ymlData.color};`);
    hasErrors = true;
  }

  // Prüfe Emoji
  if (ymlData.emoji !== jsonData.emoji) {
    console.error(`❌ ${eventType}: Emoji stimmt nicht überein`);
    console.error(`   YAML: ${ymlData.emoji}`);
    console.error(`   JSON: ${jsonData.emoji}`);
    hasErrors = true;
  }

  // NOTE: Namen müssen NICHT synchron sein!
  // - YAML: Längere, aussagekräftige Namen (z.B. "Ferienpass Aktion")
  // - JSON: Kürzere Namen für CMS Dateiname-Generierung (z.B. "Ferienpass")
  // Das ist gewollte Asymmetrie und verursacht KEINE Datensync-Fehler.
}

// 4.3 Prüfe auf Extra-Einträge in JSON/CSS
const cssOnlyKeys = jsonKeys.filter(k => !ymlKeys.includes(k));
if (cssOnlyKeys.length > 0) {
  console.error(`❌ Extra Keys in JSON (nicht in YAML): ${cssOnlyKeys.join(', ')}`);
  hasErrors = true;
}

// ============================================
// 5. Zusammenfassung
// ============================================

console.log('\n' + '='.repeat(50));

if (!hasErrors) {
  console.log('✅ Alle Token sind synchron!');
  console.log('   • YAML, JSON und CSS sind konsistent');
  console.log('   • Farben und Emojis matchen');
  console.log('   • CSS-Variablen sind korrekt definiert');
  console.log('\n✨ Token validation passed');
  process.exit(0);
} else {
  console.log('❌ Token Validierung fehlgeschlagen!');
  console.log('   Bitte korrigiere die Sync-Fehler oben.');
  console.log('\n   Siehe auch:');
  console.log('   • DESIGN_SYSTEM.md → 3-File Sync Pattern');
  console.log('   • ADR-CSS-REFACTOR.md → Event-Type Farben');
  process.exit(1);
}
