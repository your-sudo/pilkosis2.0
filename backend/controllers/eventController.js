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

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const {judul, start, end, time, location, type} = req.body
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id, 
            {judul, start, end, time, location, type},
            {new: true}
        )
        if (!updatedEvent) return res.status(404).json({message: 'Event tidak ditemukan'})
        res.json({message: 'Event berhasil diupdate', event: updatedEvent})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id)
        res.json({message: 'Event berhasil dihapus'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

export default router