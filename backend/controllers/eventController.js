import express from 'express'
import Event from '../models/events.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
    const {judul, start, end} = req.body
    const event = new Event({judul, start, end})
    await event.save()
    res.json({message: "Event created successfully"})
})

router.get('/', async (req, res) => {
    const events = await Event.find()
    res.json(events)
})

export default router