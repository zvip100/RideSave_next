import { NextResponse } from 'next/server';

/**
 * GET /api
 * API Root - documentation endpoint
 */
export async function GET() {
  return NextResponse.json({
    message: 'Welcome to the RideSave API!',
    version: '1.0.0',
    endpoints: {
      trips: {
        'GET /api/trips': 'Get all trips (supports query filters)',
        'POST /api/trips': 'Create a new trip',
        'GET /api/trips/:id': 'Get a specific trip',
        'PATCH /api/trips/:id': 'Update a trip',
        'DELETE /api/trips/:id': 'Delete a trip',
        'GET /api/trips/user/:id': 'Get trips by user ID',
      },
      sms: {
        'POST /api/sms': 'Twilio webhook for incoming SMS',
      },
      email: {
        'POST /api/email/send': 'Send weekly report email',
        'GET /api/email/preview': 'Preview email template',
      },
      test: {
        'POST /api/test': 'Test SMS parsing and trip creation',
      },
    },
    queryFilters: {
      trips: {
        type: 'Medicaid | Cash',
        startDate: 'YYYY-MM-DD',
        endDate: 'YYYY-MM-DD',
        paymentMethod: 'Cash | CC | Account',
        clockOnly: 'true | false',
      },
    },
  });
}


