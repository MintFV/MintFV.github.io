#!/bin/bash

# Visual Regression Testing - Update Baselines Script
# Aktualisiert die Baseline-Snapshots für Playwright Tests

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PORT=4001
BASE_URL="http://localhost:$PORT"

# Farben für Output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Visual Regression Baselines - Update${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

echo -e "${YELLOW}⚠️  WARNUNG:${NC} Dies wird alle Snapshot-Baselines aktualisiert!"
echo "Verwende dies nur nach bewussten visuellen Änderungen (z.B. CSS-Refactor)."
echo ""
read -p "Fortfahren? (j/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Jj]$ ]]
then
  echo "Abgebrochen."
  exit 0
fi

echo ""

# 1. Prüfe ob Jekyll Server läuft
echo -e "${YELLOW}[1/4]${NC} Prüfe Jekyll Server..."
JEKYLL_PID=$(pgrep -f "jekyll serve.*$PORT" 2>/dev/null || echo "")

if [ -z "$JEKYLL_PID" ]; then
  echo "  → Server läuft nicht, starte ihn..."
  cd "$ROOT_DIR"
  bundle exec jekyll serve --port "$PORT" --detach > /dev/null 2>&1
  sleep 3
  JEKYLL_PID=$(pgrep -f "jekyll serve.*$PORT")
  echo -e "  → ${GREEN}Server gestartet (PID: $JEKYLL_PID)${NC}"
else
  echo -e "  → ${GREEN}Server läuft bereits (PID: $JEKYLL_PID)${NC}"
fi

# 2. Prüfe ob Server antwortet
echo ""
echo -e "${YELLOW}[2/4]${NC} Warte auf Server-Bereitschaft..."
MAX_RETRIES=10
RETRY=0
while [ $RETRY -lt $MAX_RETRIES ]; do
  if curl -s "$BASE_URL/veranstaltungen/" > /dev/null 2>&1; then
    echo -e "  → ${GREEN}Server ist erreichbar${NC}"
    break
  fi
  RETRY=$((RETRY + 1))
  if [ $RETRY -lt $MAX_RETRIES ]; then
    echo -n "."
    sleep 1
  fi
done

if [ $RETRY -eq $MAX_RETRIES ]; then
  echo -e "  → ${RED}Server antwortet nicht nach 10s${NC}"
  exit 1
fi

# 3. Führe Tests mit Update aus
echo ""
echo -e "${YELLOW}[3/4]${NC} Aktualisiere Snapshots..."
echo "  Tests: /veranstaltungen/, /veranstaltungen/zukunft/, /veranstaltungen/archiv/"
echo ""

cd "$SCRIPT_DIR"

# Speichern des Exit-Codes
PLAYWRIGHT_BASE_URL="$BASE_URL" npm run test:visual:update 2>&1
UPDATE_EXIT_CODE=$?

# 4. Zeige Ergebnis
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}[4/4]${NC} Update-Ergebnis:"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ $UPDATE_EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}✓ SNAPSHOTS AKTUALISIERT${NC}"
  echo ""
  echo "Neue Baselines wurden erstellt:"
  echo "  • tests/visual.spec.ts-snapshots/page--veranstaltungen--chromium-darwin.png"
  echo "  • tests/visual.spec.ts-snapshots/page--veranstaltungen-zukunft--chromium-darwin.png"
  echo "  • tests/visual.spec.ts-snapshots/page--veranstaltungen-archiv--chromium-darwin.png"
  echo ""
  echo -e "${YELLOW}Nächste Schritte:${NC}"
  echo "  1. Änderungen reviewen: git diff tests/"
  echo "  2. Commiten: git add tests/ && git commit -m 'Update visual baselines'"
  echo "  3. Testen: ./tests/run-visual-tests.sh"
  echo ""
else
  echo -e "${RED}✗ UPDATE FEHLGESCHLAGEN${NC}"
  echo ""
  echo "Überprüfe die Fehlerausgabe oben."
  echo ""
fi

# Info
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Server läuft noch auf $BASE_URL"
echo "Zum Beenden: kill $JEKYLL_PID"
echo "Oder:        pkill -f 'jekyll serve'"
echo ""

exit $UPDATE_EXIT_CODE
