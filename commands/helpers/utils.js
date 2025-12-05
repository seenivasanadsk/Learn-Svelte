// commands\helpers\utils.js

import fs from 'node:fs';
import path from 'node:path';

/**
 * Returns only files (not directories) inside a given directory.
 */
export function getFilesName(dirPath) {
  if (!fs.existsSync(dirPath)) return []; // If path not exist return empty data

  return fs.readdirSync(dirPath).filter((name) => {
    const fullPath = path.join(dirPath, name);
    return fs.statSync(fullPath).isFile();
  });
}
