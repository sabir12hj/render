#!/bin/bash

# Script to backup the database
echo "Starting database backup..."

# Create a timestamp for the backup filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="database_backup_${TIMESTAMP}.sql"

# Backup the database
echo "Creating backup: $BACKUP_FILE"
pg_dump -d "$DATABASE_URL" -f "$BACKUP_FILE"

# Create a compressed version
gzip -c "$BACKUP_FILE" > "${BACKUP_FILE}.gz"

echo "Database backup completed!"
echo "Backup files created:"
echo "- $BACKUP_FILE (SQL dump)"
echo "- ${BACKUP_FILE}.gz (Compressed dump)"
