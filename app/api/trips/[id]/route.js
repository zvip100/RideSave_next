import { NextResponse } from 'next/server';
import { tripsService } from '@/lib/services';
import { errorResponse, successResponse } from '@/lib/utils';

/**
 * GET /api/trips/:id
 * Get a trip by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const trip = await tripsService.getSpecificTrip(id);

    if (!trip) {
      const { body, status } = errorResponse('Trip not found', 404);
      return NextResponse.json(body, { status });
    }

    const { body, status } = successResponse(trip);
    return NextResponse.json(body, { status });
  } catch (error) {
    console.error('Error in GET /api/trips/[id]:', error);
    const { body, status } = errorResponse(error.message, 500);
    return NextResponse.json(body, { status });
  }
}

/**
 * PATCH /api/trips/:id
 * Update a trip by ID
 */
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const trip = await tripsService.getSpecificTrip(id);

    if (!trip) {
      const { body, status } = errorResponse('Trip not found', 404);
      return NextResponse.json(body, { status });
    }

    await tripsService.updateTrip(id, data);

    const { body, status } = successResponse(
      `Trip with id ${id} updated successfully`
    );
    return NextResponse.json(body, { status });
  } catch (error) {
    console.error('Error in PATCH /api/trips/[id]:', error);
    const { body, status } = errorResponse(error.message, 500);
    return NextResponse.json(body, { status });
  }
}

/**
 * DELETE /api/trips/:id
 * Delete a trip by ID
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const trip = await tripsService.getSpecificTrip(id);

    if (!trip) {
      const { body, status } = errorResponse('Trip not found', 404);
      return NextResponse.json(body, { status });
    }

    await tripsService.deleteTrip(id);

    const { body, status } = successResponse(
      `Trip with id ${id} deleted successfully.`
    );
    return NextResponse.json(body, { status });
  } catch (error) {
    console.error('Error in DELETE /api/trips/[id]:', error);
    const { body, status } = errorResponse(error.message, 500);
    return NextResponse.json(body, { status });
  }
}

