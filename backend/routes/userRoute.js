import { Router } from 'express'
import Event from '../models/events.js'
import News from '../models/news.js'

const router = Router()

router.get('/', async (req, res) => {
    const events = await Event.find()
    const news = await News.find()
    res.json({ events, news })
})

export default router