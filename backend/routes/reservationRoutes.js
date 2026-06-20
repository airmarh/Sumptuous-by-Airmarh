import express from 'express'
import { createReservation, deleteReservation, getAllReservations, getReservation } from '../controllers/reservationController.js';

const reservationRouter = express.Router();

reservationRouter.post('/create', createReservation);
<<<<<<< Updated upstream
reservationRouter.get('/getAll', getAllReservations);
reservationRouter.delete('/delete/:id', deleteReservation);
reservationRouter.get('/get/:id', getReservation);
=======
reservationRouter.get('/getAll', adminAuth, getAllReservations);
reservationRouter.delete('/delete/:id', adminAuth, deleteReservation);
reservationRouter.get('/get/:id', adminAuth, getReservation);
reservationRouter.put('/update/:id', adminAuth, updateReservation);
>>>>>>> Stashed changes

export default reservationRouter