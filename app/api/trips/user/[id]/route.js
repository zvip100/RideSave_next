import { NextResponse } from 'next/server';
import { tripsService } from '@/lib/services';
import { errorResponse, successResponse } from '@/lib/utils';

/**
 * GET /api/trips/user/:id
 * Get trips by user ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams);

    const trips = await tripsService.getTrips({
      userId: Number(id),
      ...queryParams,
    });

    if (trips.length === 0) {
      const filterNote =
        Object.keys(queryParams).length > 0 ? ' matching your filters' : '';
      const { body, status } = errorResponse(
        `No trips found for this user${filterNote}`,
        404
      );
      return NextResponse.json(body, { status });
    }

    const { body, status } = successResponse(trips);
    return NextResponse.json(body, { status });
  } catch (error) {
    console.error('Error in GET /api/trips/user/[id]:', error);
    const { body, status } = errorResponse(error.message, 500);
    return NextResponse.json(body, { status });
  }
}

