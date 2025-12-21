#!/bin/bash

# Visual Regression Testing - Root Wrapper
# Delegiert an tests/run-visual-tests.sh

SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]}")"
cd "$SCRIPT_DIR/tests" || exit 1
exec ./run-visual-tests.sh "$@"
