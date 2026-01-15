import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { redText, yellowText } from './formatText.js';

/**
 * Execute a CLI command based on parsed user input.
 */
export default async function runCommand({ command, subCommand, ...options }) {
  const { appPath } = options
  try {
    const module = await loadCommandModule(command, appPath.commands);

    // Run named export as subcommand
    if (subCommand) {
      const fn = module[subCommand];
      if (typeof fn === 'function') {
        return await fn(options);
      }

      return printError(`Subcommand "${subCommand}" not found in "${command}".`);
    }

    // Run default export
    if (typeof module.default === 'function') {
      return await module.default(options);
    }

    printError(`Command "${command}" does not export a default function.`);
  } catch (e) {
    console.error(e);
    printError(`Wrong command: '${command}'. Command cannot be executed.`);
    printHint();
  }
}

/**
 * Loads the JS module for a given command.
 * Falls back to help message if no command is given.
 */
async function loadCommandModule(command, commandsPath) {
  if (!command) {
    printHint();
    process.exit(0);
  }

  const filePath = path.join(commandsPath, `${command}.js`);
  const fileURL = pathToFileURL(filePath).href;

  return import(fileURL);
}

/* ---------------------- Utility UI Helpers ---------------------- */

function printError(message) {
  console.log(redText(message));
}

function printHint() {
  console.log(yellowText("Try 'node command list' to see available commands."));
}
