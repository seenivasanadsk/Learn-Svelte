// commands\list.js

import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { greenText, yellowText } from './helpers/formatText.js';
import { getFilesName } from './helpers/utils.js';

export const info = 'Show available Commands';

/**
 * Main function: List all available command modules in this directory.
 */
export default async function () {
  console.log(greenText('List of available commands'));
  console.log(''); // blank line

  const commandsDir = import.meta.dirname;
  const commandFiles = getFilesName(commandsDir);

  for (const file of commandFiles) {
    const modulePath = path.join(commandsDir, file);
    const moduleURL = pathToFileURL(modulePath);

    const module = await import(moduleURL);
    const commandName = file.replace('.js', '');
    const commandInfo = module?.info || '';

    console.log(yellowText(`${commandName}\t - ${commandInfo}`));
  }
}
