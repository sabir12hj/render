#!/bin/bash

# Script to restore the database from the dump file
echo "Starting database restore..."

# Check if the dump file exists
if [ ! -f "../database_dump.sql" ]; then
  echo "Error: database_dump.sql file not found!"
  exit 1
fi

# Restore the database
echo "Restoring database from dump..."
psql -d "$DATABASE_URL" -f ../database_dump.sql

echo "Database restore completed!"
