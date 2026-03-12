import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    nis: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model('User', userSchema, 'user')
