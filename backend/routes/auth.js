import { Router } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const router = Router()

router.post("/login", (req, res) => {
    const {nis, password} = req.body

    if(!nis || !password) {
        return res.status(400).json({message: "Username dan password diperlukan"})
    }

    const token = jwt.sign({nis}, process.env.JWT_SECRET, {expiresIn: "1h"})
    res.json({token})
})

export default router