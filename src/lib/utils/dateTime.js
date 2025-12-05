// src\lib\utils\dateTime.js

/**
 * Extracts date & time components using Intl.DateTimeFormat
 * and returns them in a clean object.
 *
 * @param {Date} date
 * @returns {{
 *   year: string,
 *   month: string,
 *   day: string,
 *   hour: string,
 *   minute: string,
 *   second: string,
 *   dayPeriod: string
 * }}
 */
export function getDateTimeParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const parts = formatter.formatToParts(date);
  const result = {};

  for (const part of parts) {
    if (part.type !== 'literal') {
      result[part.type] = part.value;
    }
  }

  return result;
}

/**
 * Format a date using a custom pattern
 * Example:
 *   formatDateTime(new Date(), "YY-MM-DD-HH-II-SS-AA")
 *
 * Supported tokens:
 *   YY, MM, DD, HH, II, SS, AA
 *
 * @param {Date} date
 * @param {string} pattern
 * @returns {string}
 */
export function formatDateTime(pattern = '', date = new Date()) {
  const p = getDateTimeParts(date);

  const tokens = {
    YY: p.year,
    MM: p.month,
    DD: p.day,
    HH: p.hour,
    II: p.minute,
    SS: p.second,
    AA: p.dayPeriod
  };

  let output = pattern;

  // Replace tokens safely
  for (const token in tokens) {
    output = output.replace(token, tokens[token]);
  }

  return output;
}
