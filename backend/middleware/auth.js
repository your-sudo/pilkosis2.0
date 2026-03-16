import jwt from 'jsonwebtoken'
import 'dotenv/config'

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization")

    if(!token) {
        return res.status(401).json({message: "unauthorized"})
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message: "Token tidak valid"})
    }
}

export default authMiddleware