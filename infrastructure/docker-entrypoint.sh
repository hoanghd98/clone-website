#!/bin/sh
set -e

# First boot only (when DB empty): create schema/indexes + master data.
# Example data is NOT auto-loaded.
npx tsx scripts/ensure-db.ts

exec "$@"
