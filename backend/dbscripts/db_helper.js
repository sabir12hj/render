// Database Helper Script

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Database helper functions for common database operations
 */
class DbHelper {
  /**
   * Create a backup of the current database
   * @returns {string} The path to the created backup file
   */
  static createBackup() {
    console.log('Creating database backup...');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = `database_backup_${timestamp}.sql`;
    
    try {
      execSync(`pg_dump -d "$DATABASE_URL" -f "${backupFile}"`, { stdio: 'inherit' });
      console.log(`Backup created: ${backupFile}`);
      return backupFile;
    } catch (error) {
      console.error('Error creating backup:', error.message);
      throw error;
    }
  }

  /**
   * Restore the database from a backup file
   * @param {string} backupFile - Path to the backup file
   */
  static restoreFromBackup(backupFile) {
    if (!fs.existsSync(backupFile)) {
      throw new Error(`Backup file not found: ${backupFile}`);
    }
    
    console.log(`Restoring database from backup: ${backupFile}`);
    try {
      execSync(`psql -d "$DATABASE_URL" -f "${backupFile}"`, { stdio: 'inherit' });
      console.log('Database restore completed!');
    } catch (error) {
      console.error('Error restoring database:', error.message);
      throw error;
    }
  }

  /**
   * List all available backup files
   * @returns {Array<string>} List of backup files
   */
  static listBackups() {
    const files = fs.readdirSync('.')
      .filter(file => file.startsWith('database_backup_') && file.endsWith('.sql'));
    
    return files;
  }

  /**
   * Check database connection
   * @returns {boolean} True if connection successful
   */
  static checkConnection() {
    try {
      execSync('psql -d "$DATABASE_URL" -c "SELECT 1;"', { stdio: 'pipe' });
      console.log('Database connection successful!');
      return true;
    } catch (error) {
      console.error('Database connection failed:', error.message);
      return false;
    }
  }
}

module.exports = DbHelper;

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  try {
    switch (command) {
      case 'backup':
        DbHelper.createBackup();
        break;
      case 'restore':
        const backupFile = args[1];
        if (!backupFile) {
          console.error('Error: Please specify a backup file to restore from');
          console.log('Usage: node db_helper.js restore <backup_file>');
          process.exit(1);
        }
        DbHelper.restoreFromBackup(backupFile);
        break;
      case 'list':
        const backups = DbHelper.listBackups();
        console.log('Available database backups:');
        if (backups.length === 0) {
          console.log('No backups found');
        } else {
          backups.forEach(file => console.log(`- ${file}`));
        }
        break;
      case 'check':
        DbHelper.checkConnection();
        break;
      default:
        console.log('Database Helper Tool');
        console.log('Usage:');
        console.log('  node db_helper.js backup        - Create a new backup');
        console.log('  node db_helper.js restore <file> - Restore from backup');
        console.log('  node db_helper.js list         - List available backups');
        console.log('  node db_helper.js check        - Check database connection');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
