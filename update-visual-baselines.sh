#!/bin/bash

# Visual Regression Testing - Update Baselines Wrapper
# Delegiert an tests/update-visual-baselines.sh

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"
cd "$SCRIPT_DIR/tests" || exit 1
exec ./update-visual-baselines.sh "$@"
