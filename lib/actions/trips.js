"use server";

import { tripsService } from "@/lib/services";

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