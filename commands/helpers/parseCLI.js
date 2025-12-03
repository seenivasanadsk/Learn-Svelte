// commands\helpers\parseCLI.js

/**
 * Parse flags and positional args from CLI input.
 *
 * Supported:
 *   --key=value   → { key: "value" }
 *   --flag        → { flag: true }
 *   -v            → { v: true }
 *   file.txt      → positional
 */
export function parseFlagsAndArgs(items) {
  const flags = {};
  const args = [];

  for (const item of items) {
    // --key or --key=value
    if (item.startsWith('--')) {
      const [key, value] = item.slice(2).split('=');
      flags[key] = value === undefined ? true : stripQuotes(value);
      continue;
    }

    // -v (single-letter boolean)
    if (item.startsWith('-') && item.length > 1) {
      flags[item.slice(1)] = true;
      continue;
    }

    // Positional
    args.push(item);
  }

  return { flags, args };
}

/**
 * Retrieves the main command, subcommand, flags, and args.
 */
export function parseCommandLine(argv = process.argv.slice(2)) {
  if (argv.length === 0) {
    return buildResult(null, null, {}, []);
  }

  const [rawCommand, ...rest] = argv;
  const [command, subCommand] = rawCommand.split(':');

  const { flags, args } = parseFlagsAndArgs(rest);

  return buildResult(command, subCommand, flags, args);
}

/** Removes surrounding single or double quotes */
function stripQuotes(v) {
  return v.replace(/^['"](.*)['"]$/, '$1');
}

/** Creates a uniform result object */
function buildResult(command, subCommand, flags, args) {
  return {
    command: command || null,
    subCommand: subCommand || null,
    flags,
    args
  };
}
