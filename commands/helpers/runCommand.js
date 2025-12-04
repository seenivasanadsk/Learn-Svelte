import path from "path";
import { pathToFileURL } from "url";

export default async function runCommand(parsedInput) {
  const { command, subCommand, ...flags } = parsedInput;

  try {
    const module = await loadCommandModule(command);

    if (subCommand) {
      const fn = module[subCommand];
      if (typeof fn === "function") {
        await fn(flags);
      } else {
        console.error(`Subcommand "${subCommand}" not found in "${command}".`);
      }
    } else {
      if (typeof module.default === "function") {
        await module.default(flags);
      } else {
        console.error(`Command "${command}" does not export a default function.`);
      }
    }

  } catch (err) {
    console.error(`Error loading command "${command}": ${err.message}`);
  }
}

async function loadCommandModule(command) {
  if (!command) throw new Error("No command provided.");

  // Using import.meta.dirname (Node 22+)
  const modulePath = path.join(import.meta.dirname, "../", `${command}.js`);

  // Must convert path → file:// URL
  const moduleURL = pathToFileURL(modulePath).href;

  return import(moduleURL);
}
