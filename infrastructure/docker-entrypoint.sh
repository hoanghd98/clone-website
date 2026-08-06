#!/bin/sh
set -e

. /app/scripts/ensure-env.sh

# First boot only (when DB empty): create schema/indexes + master data.
# Example data is NOT auto-loaded.
npx tsx scripts/ensure-db.ts

exec "$@"
