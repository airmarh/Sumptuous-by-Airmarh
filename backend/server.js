import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoutes.js'
import reservationRouter from './routes/reservationRoutes.js'
import { startReminderJob } from './jobs/reminderJob.js'

const app = express()

const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

app.use(cors())
app.use(express.json())

startReminderJob()

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/reservation', reservationRouter)

app.get('/', (req,res) => {
    res.send("API working")
})

app.listen(port, () => console.log('Server started on port ' + port))