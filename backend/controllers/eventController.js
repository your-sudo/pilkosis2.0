import express from 'express'
import Event from '../models/events.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
    const {judul, start, end, time, location, type} = req.body
    const event = new Event({judul, start, end, time, location, type})
    await event.save()
    res.json({message: "Event created successfully"})
})

router.get('/', async (req, res) => {
    try {
        const events = await Event.find()
        res.json(events)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

export default router