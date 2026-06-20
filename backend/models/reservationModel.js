import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    phone: {type:String, required:true},
    date: {type:String, required:true},
    time: {type:String, required:true},
    guests: {type:Number, required:true},
    status: {type:String, enum: ['confirmed', 'cancelled', 'no_show'], default: 'confirmed'},
    reminderSent: {type:Boolean, default: false},
})

export default mongoose.model('Reservation', reservationSchema)