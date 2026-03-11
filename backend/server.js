import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import userRoutes from "./routes/userRoute.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/', userRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})