import express from 'express'
import News from '../models/news.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
    const {judul, deskripsi, tanggal} = req.body
    const news = new News({judul, deskripsi, tanggal})
    await news.save()
    res.json({message: "Berita acara berhasil dibuat"})
})

router.get('/', async (req, res) => {
    const news = await News.find()
    res.json(news)
})

export default router