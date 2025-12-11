import { NextResponse } from 'next/server';
import { tripsService } from '@/lib/services';
import { errorResponse, successResponse } from '@/lib/utils';

/**
 * POST /api/test
 * Test SMS parsing and trip creation
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const result = await tripsService.parseAndCreateTrip(data.Body);

    const { body, status } = successResponse(
      `Trip created successfully with id: ${result.id}`,
      201
    );
    return NextResponse.json(body, { status });
  } catch (error) {
    console.error('Error in POST /api/test:', error);
    const { body, status } = errorResponse(error.message, 500);
    return NextResponse.json(body, { status });
  }
}


