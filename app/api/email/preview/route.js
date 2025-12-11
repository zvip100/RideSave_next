import { NextResponse } from 'next/server';
import { renderWeeklyTripsEmail } from '@/lib/services/email';
import { sampleTrips } from '@/emails/preview-data';

/**
 * GET /api/email/preview
 * Preview the rendered email HTML
 */
export async function GET() {
  try {
    const { html } = await renderWeeklyTripsEmail({
      userName: 'Zvi Podrigal',
      unitNumber: '144',
      weekStart: 'Nov 21, 2025',
      weekEnd: 'Nov 28, 2025',
      trips: sampleTrips,
    });

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error rendering email preview:', error);
    return NextResponse.json(
      {
        message: 'Error rendering email',
        error: error.message,
      },
      { status: 500 }
    );
  }
}


