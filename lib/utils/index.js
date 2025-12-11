/**
 * Clean object fields by removing null, false, and empty strings
 * @param {object} object - Object to clean
 * @returns {object} Cleaned object
 */
export function cleanObjectFields(object) {
  const cleanedObject = {};

  for (const [key, value] of Object.entries(object)) {
    if (value !== null && value !== false && value !== '') {
      cleanedObject[key] = value;
    }
  }
  return cleanedObject;
}

/**
 * Create a JSON error response for Next.js API routes
 * @param {string} message - Error message
 * @param {number} status - HTTP status code (400, 404, 500, etc.)
 * @returns {object} { body, status } for NextResponse.json()
 */
export function errorResponse(message, status = 500) {
  const formattedMessage =
    status === 500 ? `Error processing request: ${message}` : message;

  return {
    body: { success: false, message: formattedMessage },
    status,
  };
}

/**
 * Create a JSON success response for Next.js API routes
 * @param {object|string} payload - Data object/array OR message string
 * @param {number} status - HTTP status code (default: 200)
 * @returns {object} { body, status } for NextResponse.json()
 */
export function successResponse(payload, status = 200) {
  const isMessage = typeof payload === 'string';

  return {
    body: {
      success: true,
      ...(isMessage ? { message: payload } : { data: payload }),
    },
    status,
  };
}


