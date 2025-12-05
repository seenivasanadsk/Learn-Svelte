// commands\helpers\formatText.js

const ANSI = {
  reset: '\x1b[0m',

  colors: {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    gray: 90,

    brightRed: 91,
    brightGreen: 92,
    brightYellow: 93,
    brightBlue: 94,
    brightMagenta: 95,
    brightCyan: 96,
    brightWhite: 97
  },

  bg: {
    black: 40,
    red: 41,
    green: 42,
    yellow: 43,
    blue: 44,
    magenta: 45,
    cyan: 46,
    white: 47,
    gray: 100,

    brightRed: 101,
    brightGreen: 102,
    brightYellow: 103,
    brightBlue: 104,
    brightMagenta: 105,
    brightCyan: 106,
    brightWhite: 107
  },

  styles: {
    bold: 1,
    dim: 2,
    italic: 3,
    underline: 4,
    blink: 5,
    inverse: 7,
    hidden: 8,
    strikethrough: 9
  }
};

/* ---------------------- Utilities ------------------------- */

const code = (n) => `\x1b[${n}m`;
const rgb = (r, g, b) => `\x1b[38;2;${r};${g};${b}m`;
const bgRgb = (r, g, b) => `\x1b[48;2;${r};${g};${b}m`;
const color256 = (n) => `\x1b[38;5;${n}m`;
const bg256 = (n) => `\x1b[48;5;${n}m`;

const normalize = (x) => x?.toString().trim().toLowerCase() || '';
const isObj = (x) => typeof x === 'object' && !Array.isArray(x);

/** Convert HEX → RGB (supports #fff or #ffffff) */
const hexToRgb = (hex) => {
  hex = normalize(hex).replace('#', '');
  if (hex.length === 3) hex = hex.replace(/./g, (c) => c + c);
  const num = parseInt(hex, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

/** Get ANSI code by case-insensitive match */
const find = (dict, name) => {
  const key = Object.keys(dict).find((k) => k.toLowerCase() === name);
  return key ? dict[key] : null;
};

/* ---------------------- Main Formatter -------------------- */

export default function formatText(text, opts = {}) {
  let out = '';

  const colorInput = opts.color || opts.fg;
  const bgInput = opts.bgColor || opts.bg;

  /* ------------ FOREGROUND COLOR ----------------- */
  if (colorInput !== undefined) {
    out += parseColor(colorInput, false);
  }

  /* ------------ BACKGROUND COLOR ----------------- */
  if (bgInput !== undefined) {
    out += parseColor(bgInput, true);
  }

  /* ------------------ STYLES --------------------- */
  const styles = opts.styles || opts.style;
  if (styles) {
    const list = Array.isArray(styles) ? styles : [styles];
    for (const s of list) {
      const codeVal = find(ANSI.styles, normalize(s));
      if (codeVal) out += code(codeVal);
    }
  }

  // Shortcuts: bold, underline, italic...
  ['bold', 'underline', 'italic', 'dim', 'blink', 'inverse', 'hidden', 'strikethrough'].forEach(
    (s) => {
      if (opts[s]) out += code(ANSI.styles[s]);
    }
  );

  return `${out}${text}${ANSI.reset}`;
}

/* ------------- COLOR PARSER (supports ANY format) ---------------- */
function parseColor(input, isBg = false) {
  const n = normalize(input);

  // Named colors
  const nameCode = find(isBg ? ANSI.bg : ANSI.colors, n);
  if (nameCode) return code(nameCode);

  // HEX (#fff or #ffffff)
  if (n.startsWith('#')) {
    const [r, g, b] = hexToRgb(n);
    return isBg ? bgRgb(r, g, b) : rgb(r, g, b);
  }

  // RGB array [r, g, b]
  if (Array.isArray(input)) {
    return isBg ? bgRgb(...input) : rgb(...input);
  }

  // RGB object { r, g, b }
  if (isObj(input)) {
    return isBg ? bgRgb(input.r, input.g, input.b) : rgb(input.r, input.g, input.b);
  }

  // 256 color (0–255)
  if (!isNaN(Number(input))) {
    const num = Number(input);
    if (num >= 0 && num <= 255) {
      return isBg ? bg256(num) : color256(num);
    }
  }

  return '';
}

// Helper functions
export const redText = (text) => formatText(text, { fg: 'red', style: 'bold' });
export const greenText = (text) => formatText(text, { fg: 'green', style: 'bold' });
export const yellowText = (text) => formatText(text, { fg: 'yellow', style: 'bold' });
export const cyanText = (text) => formatText(text, { fg: 'cyan', style: 'bold' });
export const magentaText = (text) => formatText(text, { fg: 'magenta', style: 'bold' });
export const blueText = (text) => formatText(text, { fg: 'blue', style: 'bold' });
