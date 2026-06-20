import reservationModel from '../models/reservationModel.js'
import { sendReservationConfirmation, sendReservationUpdate, sendReservationCancellation } from '../config/email.js'

// Restaurant capacity settings
const MAX_CAPACITY = Number(process.env.MAX_CAPACITY) || 40  // max guests at any one time
const DINING_WINDOW = Number(process.env.DINING_WINDOW_MINS) || 120  // assumed dining duration in minutes

// Converts "9:30 AM" / "8:00 PM" to minutes since midnight
const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(' ')
    let [hours, minutes] = time.split(':').map(Number)
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
    return hours * 60 + minutes
}

export const createReservation = async(req, res) => {
    try{
        const {name, email, phone, date, time, guests} = req.body
        if(!name || !email || !phone || !date || !time || !guests){
            return res.status(400).json({success:false, message: "Kindly provide all fields"})
        }

        // Capacity check — only confirmed reservations count (cancelled & no-shows free up capacity)
        const existingReservations = await reservationModel.find({ date, status: 'confirmed' })

        const newStart = parseTime(time)
        const newEnd = newStart + DINING_WINDOW

        const overlappingGuests = existingReservations.reduce((total, res) => {
            const resStart = parseTime(res.time)
            const resEnd = resStart + DINING_WINDOW
            // Two windows overlap if each starts before the other ends
            if (newStart < resEnd && resStart < newEnd) {
                return total + res.guests
            }
            return total
        }, 0)

        if (overlappingGuests + Number(guests) > MAX_CAPACITY) {
            return res.status(400).json({
                success: false,
                message: `Sorry, we're fully booked around that time. Please choose a different time slot.`
            })
        }

        const reservation = new reservationModel({name, email, phone, date, time, guests})
        await reservation.save()

        // Send confirmation email — non-blocking so a mail failure doesn't fail the reservation
        sendReservationConfirmation({ name, email, date, time, guests }).catch(err =>
            console.error('Email send failed:', err.message)
        )

        res.status(201).json({success:true, message: "Reservation created successfully!"})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: error.message})
    }
}

<<<<<<< Updated upstream
=======
export const updateReservation = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests, status } = req.body

        // Fetch the existing reservation before updating so we can detect changes
        const existing = await reservationModel.findById(req.params.id)
        if (!existing)
            return res.status(404).json({ success: false, message: 'Reservation not found' })

        const updateData = { name, email, phone, date, time, guests }
        if (status) updateData.status = status

        // If booking details changed and it's being cancelled, reset reminderSent
        // so a rebooked slot would send a fresh reminder
        const detailsChanged = date !== existing.date || time !== existing.time || Number(guests) !== existing.guests
        if (detailsChanged) updateData.reminderSent = false

        const reservation = await reservationModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        )

        // Send appropriate email — non-blocking
        if (status === 'cancelled' && existing.status !== 'cancelled') {
            sendReservationCancellation({ name, email, date, time })
                .catch(err => console.error('Cancellation email failed:', err.message))
        } else if (detailsChanged && status !== 'no_show') {
            sendReservationUpdate({ name, email, date, time, guests })
                .catch(err => console.error('Update email failed:', err.message))
        }

        res.json({ success: true, message: 'Reservation updated successfully', reservation })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Cannot update reservation" })
    }
}

>>>>>>> Stashed changes
export const getAllReservations = async(req, res) => {
    try{
        const reservations = await reservationModel.find({})
        res.status(200).json({success:true, message: "Reservations retrieved successfully", reservations: reservations})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: error.message})
    }
}

export const deleteReservation = async(req, res) => {
    try{
        const {id} = req.params
        await reservationModel.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Reservation cancelled!"})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: "Cannot cancel reservation"})
    }
    
}

export const getReservation = async(req, res) => {
    try{
        const {id} = req.params
        const reservation = await reservationModel.findById(id);
        res.status(200).json({success:true, message: "Reservation retrieved", reservation: reservation})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: "Cannot get reservation information"})
    }
}