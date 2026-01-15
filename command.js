// command.js
import dotenv from 'dotenv';
import path from 'path';
import { parseCommandLine } from './commands/helpers/parseCLI.js';
import runCommand from './commands/helpers/runCommand.js';

// Load .env explicitly
dotenv.config({
  path: path.resolve('.env'),
  quiet: true
});

// Construct some useful path and pass it.
const appPath = {
  root: import.meta.dirname,
  seed: path.resolve(import.meta.dirname, 'seed'),
  commands: path.resolve(import.meta.dirname, 'commands'),
}
// Process termination
const exit = () => process.exit(1)

const parsedInput = parseCommandLine();
runCommand({ ...parsedInput, exit, appPath });
