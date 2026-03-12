import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import userRoutes from "./routes/userRoute.js"
import eventRoutes from './controllers/eventController.js'
import newsRoutes from './controllers/newsController.js'
import connectDB from './config/db.js'
import 'dotenv/config'

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/news', newsRoutes)
app.use('/', userRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})