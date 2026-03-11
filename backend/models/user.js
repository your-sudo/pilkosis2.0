import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    nis: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

export default mongoose.model('User', userSchema)
