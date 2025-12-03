// command.js
import dotenv from 'dotenv';
import path from 'path';
import { parseCommandLine } from './commands/helpers/parseCLI.js';

// Load .env explicitly
dotenv.config({
  path: path.resolve('.env'),
  quiet: true
});

// Parse the CLI input
const cli = parseCommandLine();
console.log(cli);
