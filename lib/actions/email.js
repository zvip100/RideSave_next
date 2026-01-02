"use server";

import { tripsService } from '@/lib/services';
import sendEmail, { renderWeeklyTripsEmail } from '../services/email';
import { getLatestSundayToFriday } from '../utils/dates';

export async function sendWeeklyReport(userName, unitNumber) {
  const { startDate, startDateUI, endDate, endDateUI } = getLatestSundayToFriday();
  //const userName = 'Zvi Podrigal'; // TODO: get user name from database
  //const unitNumber = '144'; // TODO: get unit number from database

  try {
    const trips = await tripsService.getTrips({ startDate, endDate });

    const { html, textEmail } = await renderWeeklyTripsEmail({
      userName,
      unitNumber,
      weekStart: startDateUI,
      weekEnd: endDateUI,
      trips,
    });

    await sendEmail(
      '',
      '',
      `Weekly Trip Report - Unit ${unitNumber}`,
      html,
      textEmail
    );

    return { success: true, message: 'Email sent successfully' };

  } catch (error) {
    console.error('Error sending weekly trips email:', error);
    return { success: false, error: error.message };
  }
}

