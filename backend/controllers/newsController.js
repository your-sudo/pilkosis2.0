import express from 'express'
import News from '../models/news.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
    const {judul, deskripsi, kategori, authorName, isNewItem, tanggal} = req.body
    const news = new News({judul, deskripsi, kategori, authorName, isNewItem, tanggal: tanggal || Date.now()})
    await news.save()
    res.json({message: "Berita acara berhasil dibuat"})
})

router.get('/', async (req, res) => {
    try {
        const news = await News.find().sort({tanggal: -1})
        res.json(news)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

export default router