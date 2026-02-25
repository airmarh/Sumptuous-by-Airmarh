import express from 'express'
import { createReservation, deleteReservation, getAllReservations, getReservation, updateReservation } from '../controllers/reservationController.js';
import adminAuth from '../middleware/adminAuth.js'

const reservationRouter = express.Router();

reservationRouter.post('/create', createReservation);
reservationRouter.get('/getAll', getAllReservations);
reservationRouter.delete('/delete/:id', deleteReservation);
reservationRouter.get('/get/:id', getReservation);
reservationRouter.put('/update/:id', adminAuth, updateReservation);

export default reservationRouter