import reservationModel from '../models/reservationModel.js'

export const createReservation = async(req, res) => {
    try{
        const {name, email, phone, date, time, guests} = req.body
        if(!name || !email || !phone || !date || !time || !guests){
            return res.status(400).json({success:false, message: "Kindly provide all fields"})
        }

        const reservation = new reservationModel({name, email, phone, date, time, guests})
        await reservation.save()

        res.status(201).json({success:true, message: "Reservation created successfully!"})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false, message: error.message})
    }
}

export const updateReservation = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests } = req.body
        const updateData = { name, email, phone, date, time, guests }

        const reservation = await reservationModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        )

        if (!reservation)
            return res.json({ success: false, message: 'Reservation not found' })

        res.json({ success: true, message: 'Reservation updated successfully', reservation })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Cannot update reservation" })
    }
}

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