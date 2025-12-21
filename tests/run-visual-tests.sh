#!/bin/bash

# Visual Regression Testing Script
# Startet Jekyll Server, führt Playwright Tests aus und zeigt Ergebnis

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
echo -e "${BLUE}  Visual Regression Tests - MINTarium Website${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
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

# 3. Führe Tests aus
echo ""
echo -e "${YELLOW}[3/4]${NC} Starte Playwright Visual Tests..."
echo "  Tests: /veranstaltungen/, /veranstaltungen/zukunft/, /veranstaltungen/archiv/"
echo ""

cd "$SCRIPT_DIR"

# Speichern des Exit-Codes
PLAYWRIGHT_BASE_URL="$BASE_URL" npm run test:visual 2>&1
TEST_EXIT_CODE=$?

# 4. Zeige Ergebnis
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}[4/4]${NC} Testergebnis:"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ $TEST_EXIT_CODE -eq 0 ]; then
  echo -e "${GREEN}✓ ALLE TESTS ERFOLGREICH${NC}"
  echo ""
  echo "Alle Visual Regression Tests haben das Baseline-Snapshot-Matching bestanden."
  echo "Keine visuellen Änderungen erkannt."
  echo ""
else
  echo -e "${RED}✗ TESTS FEHLGESCHLAGEN${NC}"
  echo ""
  echo "Es wurden Unterschiede zu den Baseline-Snapshots erkannt."
  echo "Mögliche Ursachen:"
  echo "  • CSS-Änderungen"
  echo "  • Layout-Änderungen"
  echo "  • Responsive-Design Probleme"
  echo ""
  echo -e "${YELLOW}Detaillierter Report:${NC}"
  echo "  → HTML Report: $SCRIPT_DIR/playwright-report/index.html"
  echo "  → Öffnen mit: npx playwright show-report"
  echo ""
fi

# Info
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Server läuft noch auf $BASE_URL"
echo "Zum Beenden: kill $JEKYLL_PID"
echo "Oder:        pkill -f 'jekyll serve'"
echo ""

exit $TEST_EXIT_CODE
