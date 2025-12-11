import { toNewYorkLocalTimestamp } from '@/lib/utils/dates';

/**
 * Extracts trip information from SMS message.
 * Expected format:
 * Trip from: 1 Main St New York
 * To: 2 Main St Brooklyn
 * Time: HH:MM am/pm
 *
 * @param {string} smsBody - The SMS message body
 * @returns {object|null} - Object with from, to, and time properties, or null if parsing fails
 */
export const parseTripSMS = smsBody => {
  console.log('SMS body:', smsBody);

  if (!smsBody || typeof smsBody !== 'string') {
    return null;
  }

  // Remove invisible Unicode control characters (BiDi marks, zero-width chars, etc.)
  // These are often added by mobile keyboards and messaging apps
  smsBody = smsBody.replace(
    /[\u200B-\u200F\u202A-\u202E\u2060-\u2069\u061C\uFEFF]/g,
    ''
  );

  // Case-insensitive regex to match the SMS format
  // Matches "Trip from:" (case insensitive) followed by content until "To:"
  const fromMatch = smsBody.match(/Trip\s+from:\s*(.+?)(?=\s+To:)/is);

  // Matches "To:" followed by content until "Date:" or "Time:" (whichever comes first)
  const toMatch = smsBody.match(/To:\s*(.+?)(?=\s+(?:Date|Time):)/is);

  // Matches "Time:" followed by time format (e.g., "10:50 am" or "8:30 pm")
  // Only matches HH:MM am/pm format, nothing more
  const timeMatch = smsBody.match(/Time:\s*(\d{1,2}):(\d{2})\s*(am|pm)/i);

  if (!fromMatch || !toMatch || !timeMatch) {
    return null;
  }

  // Reconstruct time string from matched groups (e.g., "10:50 am")
  const timeString = `${timeMatch[1]}:${timeMatch[2]} ${timeMatch[3].toLowerCase()}`;

  const timestamp = toNewYorkLocalTimestamp(timeString);

  const tripDetails = {
    from: fromMatch[1].trim(),
    to: toMatch[1].trim(),
    time: timestamp,
  };

  console.log('tripDetails: ', tripDetails);

  return tripDetails;
};


