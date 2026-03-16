import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import authRoutes from './routes/auth.js'
import userRoutes from "./routes/userRoute.js"
import eventRoutes from './controllers/eventController.js'
import newsRoutes from './controllers/newsController.js'
import connectDB from './config/db.js'
import 'dotenv/config'

const app = express()

connectDB()

app.use(helmet())
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/news', newsRoutes)
app.use('/', userRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})