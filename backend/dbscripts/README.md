# Database Management Scripts

This directory contains scripts to help you manage your PostgreSQL database for the Quiz Tournament application.

## Available Scripts

### Bash Scripts

- `backup_db.sh`: Creates a backup of your current database
- `restore_db.sh`: Restores your database from the backup file

### JavaScript Helper

- `db_helper.js`: A Node.js script with database helper functions

## How to Use

### Creating a Database Backup

```bash
# Using Bash script
./dbscripts/backup_db.sh

# Using JavaScript helper
node dbscripts/db_helper.js backup
```

### Restoring from a Backup

```bash
# Using Bash script
./dbscripts/restore_db.sh

# Using JavaScript helper
node dbscripts/db_helper.js restore database_dump.sql
```

### Listing Available Backups

```bash
node dbscripts/db_helper.js list
```

### Checking Database Connection

```bash
node dbscripts/db_helper.js check
```

## Database Dump Files

The main database dump files are:

- `database_dump.sql`: The complete SQL dump of your database
- `database_dump.sql.gz`: A compressed version of the dump file

These files contain all your database tables, including users, tournaments, quizzes, questions, participants, payments, and user responses.

## Importing to a Local PostgreSQL Server

If you want to restore this database dump to your local PostgreSQL server:

```bash
# For uncompressed SQL file
psql -U your_username -d your_database_name -f database_dump.sql

# For compressed file (after decompressing)
gunzip -c database_dump.sql.gz | psql -U your_username -d your_database_name
```

Replace `your_username` and `your_database_name` with your local PostgreSQL credentials.
