#!/bin/bash
# Snapshots the SQLite DB via sqlite3's online .backup (safe under concurrent writes,
# unlike copying the raw file) and uploads the compressed result to S3.
# Run manually or via cron: bash scripts/backup-to-s3.sh
set -euo pipefail
cd "$(dirname "$0")/.."

set -a
source .env
set +a

: "${S3_BACKUP_BUCKET:?S3_BACKUP_BUCKET is not set in .env}"
: "${AWS_ACCESS_KEY_ID:?AWS_ACCESS_KEY_ID is not set in .env}"
: "${AWS_SECRET_ACCESS_KEY:?AWS_SECRET_ACCESS_KEY is not set in .env}"
: "${AWS_DEFAULT_REGION:?AWS_DEFAULT_REGION is not set in .env}"

timestamp=$(date -u +%Y%m%d-%H%M%S)
file="pointcraft-$timestamp.db.gz"
tmpdir=$(mktemp -d)
trap 'rm -rf "$tmpdir"' EXIT

docker run --rm -v pointcraft_api_data:/data -v "$tmpdir":/backup alpine sh -c "
  apk add --no-cache sqlite gzip >/dev/null 2>&1 &&
  sqlite3 /data/pointcraft.db '.backup /backup/pointcraft-$timestamp.db' &&
  gzip /backup/pointcraft-$timestamp.db
"

docker run --rm \
  -e AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY_ID" \
  -e AWS_SECRET_ACCESS_KEY="$AWS_SECRET_ACCESS_KEY" \
  -e AWS_DEFAULT_REGION="$AWS_DEFAULT_REGION" \
  -v "$tmpdir":/backup \
  amazon/aws-cli s3 cp "/backup/$file" "s3://$S3_BACKUP_BUCKET/$file"

echo "Backup uploaded: s3://$S3_BACKUP_BUCKET/$file"
