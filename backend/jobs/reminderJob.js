import cron from 'node-cron'
import reservationModel from '../models/reservationModel.js'
import { sendReservationReminder } from '../config/email.js'

// Converts "7:30 PM" → a Date object on the given date string "2026-06-21"
const toDateTime = (dateStr, timeStr) => {
    const [timePart, period] = timeStr.split(' ')
    let [hours, minutes] = timePart.split(':').map(Number)
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
    const [year, month, day] = dateStr.split('-').map(Number)
    return new Date(year, month - 1, day, hours, minutes, 0)
}

export const startReminderJob = () => {
    // Runs every 30 minutes
    cron.schedule('*/30 * * * *', async () => {
        try {
            const now = new Date()
            // Look for reservations between 23 and 25 hours from now
            const windowStart = new Date(now.getTime() + 23 * 60 * 60 * 1000)
            const windowEnd   = new Date(now.getTime() + 25 * 60 * 60 * 1000)

            const reservations = await reservationModel.find({
                status: 'confirmed',
                reminderSent: false,
            })

            for (const reservation of reservations) {
                const reservationTime = toDateTime(reservation.date, reservation.time)

                if (reservationTime >= windowStart && reservationTime <= windowEnd) {
                    await sendReservationReminder({
                        name:   reservation.name,
                        email:  reservation.email,
                        date:   reservation.date,
                        time:   reservation.time,
                        guests: reservation.guests,
                    })

                    await reservationModel.findByIdAndUpdate(reservation._id, { reminderSent: true })
                    console.log(`Reminder sent to ${reservation.email} for ${reservation.date} at ${reservation.time}`)
                }
            }
        } catch (error) {
            console.error('Reminder job error:', error.message)
        }
    })

    console.log('Reservation reminder job started (runs every 30 minutes)')
}
