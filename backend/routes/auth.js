import { Router } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import User from '../models/user.js'
import { register } from '../controllers/authController.js'

const router = Router()


router.post("/login", async (req, res) => {
    const {nis, password} = req.body

    if(!nis || !password) {
        return res.status(400).json({message: "NIS dan password diperlukan"})
    }

    const user = await User.findOne({nis})

    if(!user) {
        return res.status(401).json({message: "NIS atau password salah"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(401).json({message: "NIS atau password salah"})
    }

    const token = jwt.sign({nis: user.nis}, process.env.JWT_SECRET, {expiresIn: "1h"})
    res.json({token})
})

export default router