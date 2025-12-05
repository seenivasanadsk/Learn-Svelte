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

const parsedInput = parseCommandLine();
runCommand(parsedInput);
