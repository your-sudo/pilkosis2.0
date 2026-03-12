import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    judul: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        required: true
    }
})

export default mongoose.model('News', NewsSchema)
