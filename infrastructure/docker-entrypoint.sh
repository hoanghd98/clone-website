#!/bin/sh
set -e

# Runtime only — never run during image build (avoids baking secrets into layers).
# 1) JWT_SECRET + SEED_ADMIN_PASSWORD (generate if unset; persist in mounted data/)
# 2) migrate + admin seed (idempotent)
# Example demo rows (manual):
#   docker compose -f infrastructure/docker-compose.yml exec web npm run db:seed:examples
. /app/scripts/ensure-env.sh

npx tsx scripts/ensure-db.ts

exec "$@"
