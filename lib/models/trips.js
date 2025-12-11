import { db } from '@/lib/db';
import { and, eq, gte, lte, desc } from 'drizzle-orm';
import { trips } from '@/lib/db/schema';

const tripsModel = {
  async createTrip(tripDetails) {
    try {
      const [trip] = await db
        .insert(trips)
        .values({ ...tripDetails, userId: 3 })
        .returning({ id: trips.id });

      console.log('Trip created successfully with id:', trip.id);
      return trip;
    } catch (error) {
      console.error('Error creating trip:', error.message);
      throw error;
    }
  },

  /**
   * Get trips with optional filters
   * @param {object} filters - Optional filters to apply
   * @param {number} filters.id - Get specific trip by ID
   * @param {number} filters.userId - Filter by user ID
   * @param {string} filters.type - Filter by trip type ('Medicaid' or 'Cash')
   * @param {string} filters.startDate - Get trips after this date
   * @param {string} filters.endDate - Get trips before this date
   * @param {string} filters.paymentMethod - Filter by payment method (Cash/CC/Account)
   * @param {boolean} filters.clockOnly - Filter by clock only (true/false)
   * @returns {Promise<Array>} Array of trips matching the filters
   */
  async getTrips(filters = {}) {
    try {
      const conditions = [];

      // Optional filter: specific trip by id
      if (filters.id) {
        conditions.push(eq(trips.id, filters.id));
      }

      // Optional filter: userId
      if (filters.userId) {
        conditions.push(eq(trips.userId, filters.userId));
      }

      // Optional filter: trip type (Medicaid/Cash)
      if (filters.type) {
        conditions.push(eq(trips.type, filters.type));
      }

      // Optional filter: start date (trips after this date)
      if (filters.startDate) {
        conditions.push(gte(trips.time, filters.startDate));
      }

      // Optional filter: end date (trips before this date)
      if (filters.endDate) {
        conditions.push(lte(trips.time, filters.endDate));
      }

      // Optional filter: payment method (Cash/CC/Account)
      if (filters.paymentMethod) {
        conditions.push(eq(trips.paymentMethod, filters.paymentMethod));
      }

      // Optional filter: clock only (true/false)
      if (filters.clockOnly) {
        conditions.push(eq(trips.clockOnly, filters.clockOnly));
      }

      // Build query with optional where clause
      let query = db.select().from(trips);

      // Apply filters if any exist
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }

      const result = await query.orderBy(desc(trips.time));

      console.log(result.length, 'trips fetched successfully.');
      return result;
    } catch (error) {
      console.error('Error getting trips:', error.message);
      throw error;
    }
  },

  /**
   * Update a trip by ID
   * @param {number} id - Trip ID
   * @param {object} tripDetails - Trip details
   * @returns {Promise<void>} Void
   */
  async updateTrip(id, tripDetails) {
    try {
      const [trip] = await db
        .update(trips)
        .set(tripDetails)
        .where(eq(trips.id, id))
        .returning({ id: trips.id });

      console.log(`Trip with id ${trip.id} updated successfully.`);
    } catch (error) {
      console.error('Error updating trip:', error.message);
      throw error;
    }
  },

  /**
   * Delete a trip by ID
   * @param {number} id - Trip ID
   * @returns {Promise<void>} Void
   */
  async deleteTrip(id) {
    try {
      await db.delete(trips).where(eq(trips.id, id));
      console.log(`Trip with id ${id} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting trip:', error.message);
      throw error;
    }
  },
};

export default tripsModel;


