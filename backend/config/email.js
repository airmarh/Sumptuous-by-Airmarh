import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

const bookingTable = (date, time, guests) => `
    <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <tr><td style="padding: 8px; color: #6b7280;">Date</td><td style="padding: 8px; font-weight: bold;">${date}</td></tr>
        <tr style="background: #f9fafb;"><td style="padding: 8px; color: #6b7280;">Time</td><td style="padding: 8px; font-weight: bold;">${time}</td></tr>
        <tr><td style="padding: 8px; color: #6b7280;">Guests</td><td style="padding: 8px; font-weight: bold;">${guests}</td></tr>
    </table>
`

const emailWrapper = (content) => `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
        ${content}
        <p style="color: #f59e0b; font-weight: bold; margin-top: 24px;">— The Sumptuous Team</p>
    </div>
`

export const sendReservationConfirmation = async ({ name, email, date, time, guests }) => {
    await transporter.sendMail({
        from: `"Sumptuous Restaurant" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Reservation is Confirmed!',
        html: emailWrapper(`
            <h2 style="color: #f59e0b;">Reservation Confirmed</h2>
            <p>Hi <strong>${name}</strong>, your table has been reserved. Here are your booking details:</p>
            ${bookingTable(date, time, guests)}
            <p style="color: #6b7280; font-size: 14px;">If you need to make changes, please contact us directly. We look forward to seeing you!</p>
        `),
    })
}

export const sendReservationUpdate = async ({ name, email, date, time, guests }) => {
    await transporter.sendMail({
        from: `"Sumptuous Restaurant" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Reservation Has Been Updated',
        html: emailWrapper(`
            <h2 style="color: #f59e0b;">Reservation Updated</h2>
            <p>Hi <strong>${name}</strong>, your reservation has been updated. Here are your new booking details:</p>
            ${bookingTable(date, time, guests)}
            <p style="color: #6b7280; font-size: 14px;">If this wasn't expected or you have questions, please contact us directly.</p>
        `),
    })
}

export const sendReservationCancellation = async ({ name, email, date, time }) => {
    await transporter.sendMail({
        from: `"Sumptuous Restaurant" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Your Reservation Has Been Cancelled',
        html: emailWrapper(`
            <h2 style="color: #ef4444;">Reservation Cancelled</h2>
            <p>Hi <strong>${name}</strong>, your reservation on <strong>${date}</strong> at <strong>${time}</strong> has been cancelled.</p>
            <p style="color: #6b7280; font-size: 14px;">If you believe this is a mistake or would like to rebook, please contact us directly.</p>
        `),
    })
}

export const sendReservationReminder = async ({ name, email, date, time, guests }) => {
    await transporter.sendMail({
        from: `"Sumptuous Restaurant" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reminder: Your Table is Tomorrow!',
        html: emailWrapper(`
            <h2 style="color: #f59e0b;">See You Tomorrow!</h2>
            <p>Hi <strong>${name}</strong>, just a friendly reminder that you have a reservation with us tomorrow.</p>
            ${bookingTable(date, time, guests)}
            <p style="color: #6b7280; font-size: 14px;">Can't make it? Please let us know as soon as possible so we can free up the table for other guests.</p>
        `),
    })
}
