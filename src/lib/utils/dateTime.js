// src/lib/utils/dateTime.js

/**
 * Extract date/time parts including month & weekday names
 * @param {Date} date
 */
export function getDateTimeParts(date = new Date()) {
  const baseFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const monthNameFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'long'
  });

  const monthShortFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short'
  });

  const weekdayNameFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long'
  });

  const weekdayShortFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short'
  });

  const baseParts = baseFormatter.formatToParts(date);
  const result = {};

  for (const part of baseParts) {
    if (part.type !== 'literal') {
      result[part.type] = part.value;
    }
  }

  // Add month & weekday names
  result.monthName = monthNameFormatter.format(date);
  result.monthShort = monthShortFormatter.format(date);
  result.weekdayName = weekdayNameFormatter.format(date);
  result.weekdayShort = weekdayShortFormatter.format(date);

  return result;
}

/**
 * Format using custom token pattern
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
    AA: p.dayPeriod,

    // Month and Weekday name
    MN: p.monthName,
    MS: p.monthShort,
    WN: p.weekdayName,
    WS: p.weekdayShort
  };

  let output = pattern;

  // Replace tokens (use regexp to avoid conflicts)
  for (const token in tokens) {
    const regex = new RegExp(token, 'g');
    output = output.replace(regex, tokens[token]);
  }

  return output;
}
