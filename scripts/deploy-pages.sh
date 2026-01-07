#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="personal-ai-site"
OUTPUT_DIR="out"

# Prepare deployment directory
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Copy files to output
# We only need the generated index.html for the live site.
if [[ -f "index.html" ]]; then
  cp "index.html" "$OUTPUT_DIR/"
else
  echo "ERROR: index.html not found. Did the generation step fail?"
  exit 1
fi

# Validate output
if [[ ! -n "$(ls -A "$OUTPUT_DIR" 2>/dev/null)" ]]; then
  echo "ERROR: No files to publish in $OUTPUT_DIR"
  exit 1
fi

# Deploy to gh-pages
cd "$OUTPUT_DIR"
git init
git config user.name "github-actions[bot]"
git config user.email "github-actions[bot]@users.noreply.github.com"
git checkout -b gh-pages 2>/dev/null || git branch -M gh-pages
git add .
git commit -m "Deploy site: $GITHUB_SHA" || echo "No changes to commit"
git push --force "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" gh-pages:gh-pages