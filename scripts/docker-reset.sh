#!/bin/sh
# Wipe local DB/env-state + built images, then rebuild from scratch.
# Keeps public/uploads.
set -e

ROOT="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"
COMPOSE="docker compose -f infrastructure/docker-compose.yml"

cd "$ROOT"
mkdir -p data public/uploads

echo "[docker-reset] Stopping containers and removing project images..."
$COMPOSE down --rmi local --remove-orphans

echo "[docker-reset] Clearing data/ DB + generated secrets (uploads kept)..."
rm -f data/dev.db data/dev.db-journal data/.generated-env

echo "[docker-reset] Building with --no-cache and starting..."
$COMPOSE build --no-cache
$COMPOSE up -d

echo "[docker-reset] Done. public/uploads was left untouched."
echo "[docker-reset] DB was wiped — admin is recreated on first boot; run db:seed:examples if needed."
