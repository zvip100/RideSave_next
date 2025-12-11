import { render, toPlainText } from '@react-email/render';

/**
 * Render the Weekly Trips Report email to HTML
 *
 * This function uses @react-email/render to dynamically compile JSX to HTML on-demand.
 *
 * @param {object} data - Email data
 * @param {string} data.userName - Name of the user/driver
 * @param {string} data.unitNumber - Unit number of the user/driver
 * @param {string} data.weekStart - Start date (formatted string)
 * @param {string} data.weekEnd - End date (formatted string)
 * @param {array} data.trips - Array of trip objects from getTrips service
 * @returns {Promise<object|string>} Object of rendered HTML and text email strings or a string if rendering fails
 */
export async function renderWeeklyTripsEmail(data) {
  const { userName, unitNumber, weekStart, weekEnd, trips = [] } = data;
  const totalTrips = trips.length;

  try {
    // Dynamically import the React component
    const WeeklyTripsReportModule = await import('./WeeklyTripsReport.jsx');

    const WeeklyTripsReport = WeeklyTripsReportModule.default;

    const html = await render(
      WeeklyTripsReport({
        userName,
        unitNumber,
        weekStart,
        weekEnd,
        trips,
        totalTrips,
      })
    );

    const textEmail = toPlainText(html);
    console.log('✅ Email rendered successfully using @react-email/render');

    return { html, textEmail };
  } catch (error) {
    console.error('❌ Error rendering email template:', error.message);

    // Fallback to simple text-based HTML email if rendering fails
    const medicaidTrips = trips.filter(t => t.type === 'Medicaid').length;
    const cashTrips = trips.filter(t => t.type === 'Cash').length;

    // Helper to format trip details
    const formatTripDetails = trip => {
      const date = new Date(trip.time);
      const dateStr = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      const timeStr = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      let details = `${dateStr} at ${timeStr}\n`;
      details += `From: ${trip.from}\n`;
      details += `To: ${trip.to}\n`;
      details += `Type: ${trip.type}`;

      if (trip.paymentMethod) {
        details += `\nPayment: ${trip.paymentMethod}`;
      }

      if (trip.clockOnly) {
        details += `\nClock Only`;
      }

      if (trip.stopsPrice && trip.stopsPrice > 0) {
        details += `\nStops: $${(trip.stopsPrice / 100).toFixed(2)}`;
        if (trip.stopsPaymentMethod) {
          details += ` (${trip.stopsPaymentMethod})`;
        }
      }

      if (trip.waitingPrice && trip.waitingPrice > 0) {
        details += `\nWaiting: $${(trip.waitingPrice / 100).toFixed(2)}`;
        if (trip.waitingPaymentMethod) {
          details += ` (${trip.waitingPaymentMethod})`;
        }
      }

      if (trip.notes) {
        details += `\nNotes: ${trip.notes}`;
      }

      return details;
    };

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Weekly Trip Report</title>
        </head>
        <body style="font-family: 'Courier New', monospace; background-color: #f9fafb; padding: 20px; color: #1f2937;">
          <div style="max-width: 700px; margin: 0 auto; background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 4px;">
            
            <div style="text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px; color: #2563eb;">🚕 RideSave</h1>
              <h2 style="margin: 10px 0 0; font-size: 18px; color: #4b5563; font-weight: normal;">Weekly Trip Report</h2>
              <p style="margin: 10px 0 0; color: #6b7280; font-size: 14px;">${weekStart} - ${weekEnd}</p>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="margin: 0 0 10px; font-size: 16px; color: #1f2937;">Driver Information:</h3>
              <p style="margin: 5px 0; line-height: 1.6;">
                Driver: ${userName}<br>
                Unit: ${unitNumber}
              </p>
            </div>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 15px; font-size: 16px; color: #1f2937;">Summary Statistics:</h3>
              <p style="margin: 5px 0; line-height: 1.8;">
                Total Trips: <strong>${totalTrips}</strong><br>
                Medicaid Trips: <strong>${medicaidTrips}</strong><br>
                Cash Trips: <strong>${cashTrips}</strong>
              </p>
            </div>

            <h3 style="margin: 0 0 20px; font-size: 16px; color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Trip Details:</h3>
            
            ${
              trips.length === 0
                ? '<p style="color: #6b7280; font-style: italic;">No trips recorded this week.</p>'
                : trips
                    .map(
                      (trip, index) => `
                <div style="background: ${index % 2 === 0 ? '#ffffff' : '#f9fafb'}; padding: 15px; margin-bottom: 15px; border: 1px solid #e5e7eb; border-radius: 4px;">
                  <div style="font-weight: bold; color: #2563eb; margin-bottom: 8px;">Trip #${index + 1}</div>
                  <pre style="margin: 0; font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">${formatTripDetails(trip)}</pre>
                </div>
              `
                    )
                    .join('')
            }

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                This is an automated weekly report from RideSave<br>
                © 2025 RideSave. All rights reserved.
              </p>
            </div>

          </div>
        </body>
      </html>
    `;
  }
}


