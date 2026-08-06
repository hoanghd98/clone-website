#!/bin/sh
# Ensure optional secrets exist before the app / seed starts.
# Generates JWT_SECRET and SEED_ADMIN_PASSWORD when unset, then exports them.
# Safe to source: `. scripts/ensure-env.sh`

ROOT=${ENSURE_ENV_ROOT:-$(pwd)}
ENV_FILE="$ROOT/.env"

# Persist generated values across restarts (Docker volume when available).
if [ -n "$GENERATED_ENV_FILE" ]; then
  STATE_FILE=$GENERATED_ENV_FILE
elif [ -d /app/data ] && [ -w /app/data ]; then
  STATE_FILE=/app/data/.generated-env
else
  STATE_FILE="$ROOT/.generated-env"
fi

load_env_file() {
  _file=$1
  [ -f "$_file" ] || return 0
  while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in
      ''|\#*) continue ;;
    esac
    key=${line%%=*}
    value=${line#*=}
    # strip surrounding quotes
    value=$(printf '%s' "$value" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    # do not override already-exported non-empty values
    eval "current=\${$key-}"
    if [ -z "$current" ]; then
      export "$key=$value"
    fi
  done < "$_file"
}

upsert_env_key() {
  _file=$1
  _key=$2
  _value=$3
  _tmp="${_file}.tmp.$$"

  if [ -f "$_file" ] && grep -q "^${_key}=" "$_file" 2>/dev/null; then
    # keep existing non-empty value in file
    existing=$(grep "^${_key}=" "$_file" | head -n1 | cut -d= -f2-)
    existing=$(printf '%s' "$existing" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
    if [ -n "$existing" ]; then
      return 0
    fi
    grep -v "^${_key}=" "$_file" > "$_tmp" 2>/dev/null || true
    mv "$_tmp" "$_file"
  fi

  printf '%s="%s"\n' "$_key" "$_value" >> "$_file"
}

write_state_file() {
  mkdir -p "$(dirname "$STATE_FILE")" 2>/dev/null || true
  {
    printf 'JWT_SECRET="%s"\n' "$JWT_SECRET"
    printf 'SEED_ADMIN_PASSWORD="%s"\n' "$SEED_ADMIN_PASSWORD"
  } > "$STATE_FILE"
  chmod 600 "$STATE_FILE" 2>/dev/null || true
}

# Prefer process env, then .env, then previously generated state.
load_env_file "$ENV_FILE"
load_env_file "$STATE_FILE"

GENERATED_ANY=0

if [ -z "$JWT_SECRET" ]; then
  JWT_SECRET=$(openssl rand -base64 32)
  export JWT_SECRET
  GENERATED_ANY=1
  echo "[ensure-env] Generated JWT_SECRET"
fi

if [ -z "$SEED_ADMIN_PASSWORD" ]; then
  SEED_ADMIN_PASSWORD=$(openssl rand -base64 18 | tr -d '/+=' | cut -c1-20)
  export SEED_ADMIN_PASSWORD
  GENERATED_ANY=1
  echo "[ensure-env] Generated SEED_ADMIN_PASSWORD=${SEED_ADMIN_PASSWORD}"
  echo "[ensure-env] Save this password — it is used for the first admin user (username: admin)."
fi

write_state_file

# Keep local .env in sync when writable (host / bind-mounted).
if [ -w "$ROOT" ] || [ -w "$ENV_FILE" ]; then
  [ -f "$ENV_FILE" ] || touch "$ENV_FILE"
  upsert_env_key "$ENV_FILE" JWT_SECRET "$JWT_SECRET"
  upsert_env_key "$ENV_FILE" SEED_ADMIN_PASSWORD "$SEED_ADMIN_PASSWORD"
fi

if [ "$GENERATED_ANY" -eq 0 ]; then
  echo "[ensure-env] Using existing JWT_SECRET and SEED_ADMIN_PASSWORD"
fi

return 0 2>/dev/null || exit 0
