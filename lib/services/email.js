import { google } from 'googleapis';
import MailComposer from 'nodemailer/lib/mail-composer/index.js';

export { renderWeeklyTripsEmail } from '../../emails/email-render.js';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
  GOOGLE_REFRESH_TOKEN,
  GMAIL_USER,
  RECIPIENT_EMAIL,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
});

// Build MIME + convert to base64url for Gmail API
function buildRawEmail(mailOptions) {
  const composer = new MailComposer(mailOptions);

  return new Promise((resolve, reject) => {
    composer.compile().build((err, message) => {
      if (err) return reject(err);

      const base64url = message
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      resolve(base64url);
    });
  });
}

export default async function sendEmail(
  recipient,
  replyTo,
  subject,
  html,
  text
) {
  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const mailOptions = {
      from: `RideSave <${GMAIL_USER}>`,
      to: recipient || RECIPIENT_EMAIL,
      replyTo: replyTo || 'hershypod@gmail.com',
      subject,
      html,
      text,
    };

    const rawMessage = await buildRawEmail(mailOptions);

    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: rawMessage },
    });

    console.log('Email sent! Gmail message ID:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('Error sending email via Gmail API:', error.message);
    throw error;
  }
}


