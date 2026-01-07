#!/usr/bin/env bash
set -euo pipefail

SCRIPT_PATH="personal-ai-site/scripts/generate-personalAI.js"

if [[ ! -f "$SCRIPT_PATH" ]]; then
  SCRIPT_PATH="scripts/generate-personalAI.js"
fi

if [[ ! -f "$SCRIPT_PATH" ]]; then
  echo "ERROR: generate-personalAI.js not found"
  exit 1
fi

echo "Running generator: $SCRIPT_PATH"
node "$SCRIPT_PATH"
node "$SCRIPT_PATH"