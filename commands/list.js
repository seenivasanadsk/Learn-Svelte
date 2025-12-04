import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import formatText from './helpers/formatText.js';

export const info = 'Show available Commands';

/**
 * Main function: List all available command modules in this directory.
 */
export default async function () {
  console.log(formatText('List of available commands', { fg: 'green', style: 'bold' }));
  console.log(''); // blank line

  const commandsDir = import.meta.dirname;
  const commandFiles = getFilesOnly(commandsDir);

  for (const file of commandFiles) {
    const modulePath = path.join(commandsDir, file);
    const moduleURL = pathToFileURL(modulePath);

    const module = await import(moduleURL);
    const commandName = file.replace('.js', '');
    const commandInfo = module?.info || '';

    console.log(
      formatText(`${commandName} - ${commandInfo}`, {
        fg: 'yellow',
        style: 'bold'
      })
    );
  }
}

/**
 * Returns only files (not directories) inside a given directory.
 */
function getFilesOnly(dirPath) {
  return fs.readdirSync(dirPath).filter((name) => {
    const fullPath = path.join(dirPath, name);
    return fs.statSync(fullPath).isFile();
  });
}
