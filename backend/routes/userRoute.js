import { Router } from 'express'
import bcrypt from 'bcryptjs'

const router = Router()

router.get('/', async (req, res) => {
    const password = "joechillworld"
    const hashed = await bcrypt.hash(password, 10)
    res.json({ hashed })
})

export default router