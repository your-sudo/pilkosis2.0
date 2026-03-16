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

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const {judul, deskripsi, kategori, authorName, isNewItem, tanggal} = req.body
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            {judul, deskripsi, kategori, authorName, isNewItem, tanggal},
            {new: true}
        )
        if (!updatedNews) return res.status(404).json({message: 'Berita tidak ditemukan'})
        res.json({message: 'Berita berhasil diupdate', news: updatedNews})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id)
        res.json({message: 'Berita berhasil dihapus'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

export default router