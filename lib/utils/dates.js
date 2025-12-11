import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

/**
 * Converts "10:30 am" to a New York local timestamp string: "YYYY-MM-DD HH:mm:ss"
 *
 * @param {string} timeStr - e.g. "10:30 am"
 * @param {string|null} dateStr - e.g. "2025-11-18" (optional)
 * @returns {string} Timestamp like "2025-11-18 10:30:00"
 */
export function toNewYorkLocalTimestamp(timeStr, dateStr = null) {
  // If date not provided → use today's date in NY
  if (!dateStr) {
    dateStr = dayjs().tz('America/New_York').format('YYYY-MM-DD');
  }

  // Parse with NY timezone and AM/PM awareness
  const parsed = dayjs.tz(
    `${dateStr} ${timeStr}`,
    'YYYY-MM-DD h:mm a',
    'America/New_York'
  );

  if (!parsed.isValid()) {
    throw new Error(`Invalid time format: "${timeStr}"`);
  }

  // Return exact local timestamp (no timezone conversion)
  return parsed.format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Converts HTML datetime input value to NY local timestamp
 * HTML datetime format: "2025-11-27T12:10" (ISO format with 24hr time)
 *
 * @param {string} datetimeStr - e.g. "2025-11-27T12:10"
 * @returns {string} Timestamp like "2025-11-27 12:10:00"
 */
export function htmlDateTimeToTimestamp(datetimeStr) {
  // Parse the datetime string into NY timezone
  const parsed = dayjs.tz(datetimeStr, 'America/New_York');

  if (!parsed.isValid()) {
    throw new Error(`Invalid datetime format: "${datetimeStr}"`);
  }

  // Return formatted timestamp
  return parsed.format('YYYY-MM-DD HH:mm:ss');
}

/**
 * Converts DB timestamp to readable date format
 * DB format: "2025-11-19 12:30:00"
 * Output format: "Nov 19 2025" or "Nov 19 2025 9:05 AM" (with time)
 *
 * @param {string} dbTimestamp - e.g. "2025-11-19 12:30:00"
 * @param {boolean} includeTime - If true, includes time in 12-hour format (default: false)
 * @returns {string} Formatted date like "Nov 19 2025" or "Nov 19 2025 9:05 AM"
 */
export function formatDbDateToReadable(dbTimestamp, includeTime = false) {
  const parsed = dayjs(dbTimestamp);

  if (!parsed.isValid()) {
    throw new Error(`Invalid timestamp format: "${dbTimestamp}"`);
  }

  if (includeTime) {
    return parsed.format('MMM D YYYY h:mm A');
  }

  return parsed.format('MMM D YYYY');
}

/**
 * Get the latest Sunday-Friday week range
 * Returns the most recent completed or current week (Sunday to Friday)
 * If today is Saturday, returns current week. Otherwise, returns previous week.
 *
 * @returns {object} { startDate, startDateUI, endDate, endDateUI }
 * @example
 * // If today is Wednesday Nov 27, 2025:
 * getLatestSundayToFriday()
 * // Returns:
 * // {
 * //   startDate: "2025-11-17",      // Previous week Sunday (DB format)
 * //   startDateUI: "Nov 17 2025",   // Previous week Sunday (UI format)
 * //   endDate: "2025-11-22",        // Previous week Friday (DB format)
 * //   endDateUI: "Nov 22 2025"      // Previous week Friday (UI format)
 * // }
 */
export function getLatestSundayToFriday() {
  const today = dayjs();
  const dayOfWeek = today.day(); // 0=Sunday, 5=Friday, 6=Saturday

  let friday;

  // Determine the most recent Friday
  if (dayOfWeek === 6) {
    // Today is Saturday - use yesterday (Friday)
    friday = today.subtract(1, 'day');
  } else if (dayOfWeek === 5) {
    // Today is Friday - use today
    friday = today;
  } else {
    // Sun-Thu - use last week's Friday
    friday = today.subtract(1, 'week').day(5);
  }

  // Get the Sunday of the same week as that Friday
  // Friday's week Sunday is 5 days before Friday
  const sunday = friday.subtract(5, 'day');

  return {
    startDate: sunday.format('YYYY-MM-DD'),
    startDateUI: sunday.format('MMM D YYYY'),
    endDate: friday.format('YYYY-MM-DD'),
    endDateUI: friday.format('MMM D YYYY'),
  };
}


