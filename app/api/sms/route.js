import { NextResponse } from 'next/server';
import { tripsService } from '@/lib/services';

/**
 * POST /api/sms
 * Handle incoming SMS webhook from Twilio
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const from = formData.get('From');
    const body = formData.get('Body');

    console.log('SMS from:', from);
    console.log('Message:', body);

    // Respond immediately to Twilio with empty TwiML
    // Process the SMS asynchronously after responding
    (async () => {
      try {
        const result = await tripsService.parseAndCreateTrip(body);
        console.log('Trip created successfully:', result.message);
        // TODO: Send confirmation SMS to user
      } catch (error) {
        console.error('Error processing SMS:', error);
        // TODO: Send error SMS to user
      }
    })();

    // Return TwiML response
    return new NextResponse('<Response></Response>', {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('Error in SMS webhook:', error);
    return new NextResponse('<Response></Response>', {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}


