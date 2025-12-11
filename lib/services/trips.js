import { tripsModel } from '@/lib/models';
import { parseTripSMS } from './sms';
import { htmlDateTimeToTimestamp } from '@/lib/utils/dates';
import { cleanObjectFields } from '@/lib/utils';

export const tripsService = {
  /**
   * Create a new trip
   * @param {object} tripData - Trip details
   * @param {boolean} formatTime - Whether to format the time - default is false
   * @returns {Promise<object>} Trip object
   */
  async createTrip(tripData, formatTime = false) {
    if (formatTime) {
      // Convert HTML datetime input (e.g., "2025-11-27T12:10") to DB format
      tripData.time = htmlDateTimeToTimestamp(tripData.time);
    }

    return await tripsModel.createTrip(tripData);
  },

  /**
   * Parse SMS message and create trip
   * @param {string} smsBody - SMS message body
   * @returns {Promise<object>} Trip object
   */
  async parseAndCreateTrip(smsBody) {
    const tripDetails = parseTripSMS(smsBody);

    if (!tripDetails) {
      throw new Error('Invalid SMS format. Please use the expected format.');
    }

    return await this.createTrip(tripDetails);
  },

  /**
   * Get trips with optional filters
   * @param {object} filters - Optional filters (id, userId, type, startDate, endDate)
   * @returns {Promise<array>} Array of trips
   */
  async getTrips(filters = {}) {
    let { startDate, endDate } = filters;

    if (startDate) {
      startDate = startDate + ' 00:00:00';
    }
    if (endDate) {
      endDate = endDate + ' 23:59:59';
    }

    const trips = await tripsModel.getTrips({
      ...filters,
      startDate,
      endDate,
    });

    // Remove null and false fields from each trip object
    return trips.length > 0 ? trips.map(trip => cleanObjectFields(trip)) : [];
  },

  /**
   * Get a single trip by ID
   * @param {number|string} id - Trip ID
   * @returns {Promise<object|null>} Trip object or null
   */
  async getSpecificTrip(id) {
    if (Number.isNaN(Number(id))) {
      return null;
    }

    const trip = await tripsModel.getTrips({ id: Number(id) });

    // Remove null and false fields from the trip object
    return trip.length > 0 ? cleanObjectFields(trip[0]) : null;
  },

  /**
   * Update a trip by ID
   * @param {number|string} id - Trip ID
   * @param {object} data - Trip data
   * @returns {Promise<void>} Void
   */
  async updateTrip(id, data) {
    if (data?.type && data?.type === 'Medicaid') {
      data.paymentMethod = null;
    }

    await tripsModel.updateTrip(Number(id), data);
  },

  /**
   * Delete a trip by ID
   * @param {number|string} id - Trip ID
   * @returns {Promise<void>} Void
   */
  async deleteTrip(id) {
    await tripsModel.deleteTrip(Number(id));
  },
};


