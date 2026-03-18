const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'deepan2553@gmail.com',
        pass: `${process.env.NODE_MAILER_GMAIL_KEY}`
    }
});

const generateTicketHTML = (reservation) => {
    return `
    <div style="font-family: Arial, sans-serif; max-w-600px; margin: 0 auto; background-color: #0f172a; padding: 20px; border-radius: 16px; color: white;">
      <div style="text-align: center; border-bottom: 1px solid #334155; padding-bottom: 20px;">
        <h1 style="color: #f75d00; margin: 0; font-size: 24px; letter-spacing: 2px;">NEODINE</h1>
        <p style="color: #94a3b8; margin: 5px 0 0;">Reservation Confirmed</p>
      </div>

      <div style="background-color: #1e293b; margin: 20px 0; padding: 20px; border-radius: 12px; border: 1px dashed #475569;">
        <div style="margin-bottom: 15px;">
          <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin: 0;">Guest Name</p>
          <p style="color: #f75d00;font-size: 18px; font-weight: bold; margin: 5px 0;">${reservation.name}</p>
        </div>
        
        <div style="display: flex; justify-content: space-between;">
          <div style="margin-bottom: 15px;">
            <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin: 0;">Date</p>
            <p style="color: #f75d00;font-size: 16px; font-weight: bold; margin: 5px 0;margin-right:10px">${reservation.date}</p>
          </div>
          <div style="margin-bottom: 15px;">
            <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin: 0;">Time</p>
            <p style="font-size: 16px; font-weight: bold; margin: 5px 0; color: #f75d00;">${reservation.timeSlot}</p>
          </div>
        </div>

        <div style="margin-bottom: 15px;">
            <p style="color: #64748b; font-size: 12px; text-transform: uppercase; margin: 0;">Table / Guests</p>
            <p style="color: #f75d00;font-size: 16px; margin: 5px 0;">Table #${reservation.tableId} (${reservation.guests} People)</p>
        </div>

        <div style="margin-top: 20px; border-top: 1px solid #334155; padding-top: 15px; text-align: center;">
          <p style="color: #64748b; font-size: 10px; margin: 0;">TICKET REFERENCE ID</p>
          <p style="font-family: monospace; font-size: 14px; letter-spacing: 2px; color: #f75d00;">${reservation._id}</p>
        </div>
      </div>

      <div style="text-align: center; color: #64748b; font-size: 12px;">
        <p>Please show this email at the reception.</p>
        <p>NeoDine Restaurant • 123 Culinary Ave, Food City</p>
      </div>
    </div>
  `;
};

const sendReservationEmail = async (reservation) => {
    try {
        const info = await transporter.sendMail({
            from: '"NeoDine Reservations" <your-email@gmail.com>',
            to: reservation.email,
            subject: `Your Table is Reserved! (Ref: ${reservation._id})`,
            html: generateTicketHTML(reservation),
        });
        console.log("Email sent: " + info.messageId);
        return true;
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

module.exports = { sendReservationEmail };