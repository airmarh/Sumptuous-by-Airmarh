import express from 'express'
import { createReservation, deleteReservation, getAllReservations, getReservation } from '../controllers/reservationController.js';

const reservationRouter = express.Router();

reservationRouter.post('/create', createReservation);
reservationRouter.get('/getAll', getAllReservations);
reservationRouter.delete('/delete/:id', deleteReservation);
reservationRouter.get('/get/:id', getReservation);

export default reservationRouter