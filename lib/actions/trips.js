'use server';

import { tripsService } from '@/lib/services';
import { getSession } from '@/lib/auth';

export async function loadMoreTrips(nextWeekOffset, loadedSoFar) {
  try {
    const session = await getSession();

    const result = await tripsService.getWeeklyTrips({
      userId: session.user.dbId,
      fromWeekOffset: nextWeekOffset,
      mandatoryWeeks: 1,
    });

    const newLoadedCount = loadedSoFar + result.weekGroups.reduce((sum, group) => sum + group.trips.length, 0);
    const hasMore = newLoadedCount < result.tripCounts.total;

    return { success: true, weekGroups: result.weekGroups, nextWeekOffset: result.nextWeekOffset, hasMore };
  } catch (error) {
    console.error('Error loading more trips:', error);
    return { success: false, error: error.message };
  }
}

export async function createTrip(tripData) {
  try {
    const result = await tripsService.createTrip(tripData, true);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error creating trip:', error);
    return { success: false, error: error.message };
  }
}

export async function updateTrip(tripData) {
  try {
    await tripsService.updateTrip(tripData.id, { ...tripData });
    return { success: true };
  } catch (error) {
    console.error('Error updating trip:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteTrip(id) {
  try {
    await tripsService.deleteTrip(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting trip:', error);
    return { success: false, error: error.message };
  }
}
