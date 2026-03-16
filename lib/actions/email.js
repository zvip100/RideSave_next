"use server";

import { tripsService } from "@/lib/services";
import sendEmail, { renderWeeklyTripsEmail } from "../services/email";
import {
  getLatestSundayToFriday,
  formatDbDateToReadable,
  htmlDateTimeToTimestamp,
} from "../utils/dates";
import { generateTripsExcel } from "../utils/excel";

export async function sendWeeklyReport(
  userName,
  unitNumber,
  start = null,
  end = null,
) {
  const dates = {
    startDate: null,
    endDate: null,
    startDateUI: null,
    endDateUI: null,
  };

  if (!start || !end) {
    const { startDate, startDateUI, endDate, endDateUI } =
      getLatestSundayToFriday();

    dates.startDate = startDate;
    dates.endDate = endDate;
    dates.startDateUI = startDateUI;
    dates.endDateUI = endDateUI;
  } else {
    dates.startDate = htmlDateTimeToTimestamp(start).split(" ")[0];
    dates.endDate = htmlDateTimeToTimestamp(end).split(" ")[0];
    dates.startDateUI = formatDbDateToReadable(dates.startDate);
    dates.endDateUI = formatDbDateToReadable(dates.endDate);
  }

  try {
    const trips = await tripsService.getTrips({
      startDate: dates.startDate,
      endDate: dates.endDate,
    });

    const { html, textEmail } = await renderWeeklyTripsEmail({
      userName,
      unitNumber,
      weekStart: dates.startDateUI,
      weekEnd: dates.endDateUI,
      trips,
    });

    const { buffer, filename } = generateTripsExcel(trips, dates.startDateUI);

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

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending weekly trips email:", error);
    return { success: false, error: error.message };
  }
}
