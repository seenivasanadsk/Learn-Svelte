// commands/backup.js

import { exec } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { redText, greenText, yellowText } from './helpers/formatText.js';
import { getFilesName } from './helpers/utils.js';
import { formatDateTime } from '../src/lib/utils/dateTime.js';

export const info = 'Simple MongoDB Backup (Compressed ZIP)';

export default function backup() {
  const uriBase = process.env.MONGO_URI || '';
  const dbName = process.env.MONGO_DB_NAME || '';
  const backupDir = process.env.MONGO_BACKUP_PATH || './backup';

  if (!uriBase || !dbName) {
    console.log(redText('Missing MONGO_URI or MONGO_DB_NAME'));
    return;
  }

  // Ensure backup directory exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const filename = `DB-backup-${dbName}-${formatDateTime('YY-MM-DD-HH-II-SS-AA')}.archive`;
  const dumpFolder = path.join(backupDir, filename);
  console.log(yellowText(`Starting backup for "${filename}"`));

  // Dump the MongoDB database
  const dumpCmd = `mongodump --uri="${uriBase}" --db=${dbName} --archive="${dumpFolder}" --gzip`;

  exec(dumpCmd, (dumpErr) => {
    if (dumpErr) {
      console.log(redText(`Backup failed: ${dumpErr.message}`));
      return;
    }
    console.log(greenText(`Backup completed → ${dumpFolder}`));
  });
}

/**
 * Prune old backup files from the backup directory
 * @param {string} backupDir - Folder containing backup files
 * @param {number} days - Keep files for this many days (default: 7)
 */
export function prune() {
  const backupDir = process.env.MONGO_BACKUP_PATH || './backup';
  const retuntionDays = Number(process.env.MONGO_BACKUP_RETENTION_DAYS || '7');

  // Check if directory exists
  if (!fs.existsSync(backupDir)) {
    console.log(redText(`Backup directory "${backupDir}" does not exist.`));
    return;
  }

  const dbFiles = getFilesName(backupDir); // get all backup files
  if (dbFiles.length === 0) {
    console.log(yellowText('No backup files to prune.'));
    return;
  }

  const now = Date.now();
  const maxAge = retuntionDays * 24 * 60 * 60 * 1000; // convert days to milliseconds

  dbFiles.forEach((file) => {
    const filePath = path.join(backupDir, file);
    try {
      const stats = fs.statSync(filePath);
      const age = now - stats.mtimeMs; // file last modified time

      if (age > maxAge) {
        fs.unlinkSync(filePath);
        console.log(greenText(`Deleted old backup: ${file}`));
      }
    } catch (err) {
      console.log(redText(`Failed to delete file ${file}: ${err.message}`));
    }
  });
}

export function rotate() {
  const backupDir = process.env.MONGO_BACKUP_PATH || './backup';

  // Ensure backup directory exists
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  exec('node command backup:prune', (error, stdOut) => console.log(stdOut || '', error || ''));
  exec('node command backup', (error, stdOut) => console.log(stdOut || '', error || ''));
}
