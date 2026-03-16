import { NextResponse } from "next/server";
import sendEmail, { renderWeeklyTripsEmail } from "@/lib/services/email";
import {
  getLatestSundayToFriday,
  formatDbDateToReadable,
} from "@/lib/utils/dates";
import { tripsService } from "@/lib/services";
import { generateTripsExcel } from "@/lib/utils/excel";

/**
 * POST /api/email/send
 * Send weekly report to a user
 */
export async function POST(request) {
  try {
    // Check if request has a body
    const body = await request.text();
    const data = body ? JSON.parse(body) : {};
    const { startDate, endDate } = data;
    const userName = "Zvi Podrigal"; // TODO: get user name from database
    const unitNumber = "144"; // TODO: get unit number from database
    let dateRange = {};

    if (!startDate || !endDate) {
      dateRange = getLatestSundayToFriday();
    } else {
      dateRange = {
        startDate,
        startDateUI: formatDbDateToReadable(startDate),
        endDate,
        endDateUI: formatDbDateToReadable(endDate),
      };
    }

    const trips = await tripsService.getTrips({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });

    const { html, textEmail } = await renderWeeklyTripsEmail({
      userName,
      unitNumber,
      weekStart: dateRange.startDateUI,
      weekEnd: dateRange.endDateUI,
      trips,
    });

    const { buffer, filename } = generateTripsExcel(
      trips,
      dateRange.startDateUI,
      dateRange.endDateUI,
    );

    await sendEmail(
      "",
      "",
      `Weekly Trip Report - Unit ${unitNumber}`,
      html,
      textEmail,
      [
        {
          filename,
          content: Buffer.from(buffer),
          contentType:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      ],
    );

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Error sending email", error: error.message },
      { status: 500 },
    );
  }
}
