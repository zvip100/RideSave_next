import { NextResponse } from 'next/server';
import { tripsService } from '@/lib/services';
import { errorResponse, successResponse } from '@/lib/utils';

/**
 * GET /api/trips
 * Get all trips with optional filters
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams);

    const trips = await tripsService.getTrips(queryParams);

    if (trips.length === 0) {
      const { body, status } = errorResponse(
        'No trips found matching your filters',
        404
      );
      return NextResponse.json(body, { status });
    }

    const { body, status } = successResponse(trips);
    return NextResponse.json(body, { status });
  } catch (error) {
    console.error('Error in GET /api/trips:', error);
    const { body, status } = errorResponse(error.message, 500);
    return NextResponse.json(body, { status });
  }
}

/**
 * POST /api/trips
 * Create a new trip
 */
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.from || !data.to || !data.time) {
      const { body, status } = errorResponse('Missing required fields', 400);
      return NextResponse.json(body, { status });
    }

    const result = await tripsService.createTrip(data, true);

    const { body, status } = successResponse(
      `Trip created successfully with id: ${result.id}`,
      201
    );
    return NextResponse.json(body, { status });
  } catch (error) {
    console.error('Error in POST /api/trips:', error);
    const { body, status } = errorResponse(error.message, 500);
    return NextResponse.json(body, { status });
  }
}


