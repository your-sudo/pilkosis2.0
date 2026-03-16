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
    kategori: {
        type: String,
        enum: ['Pemberitahuan', 'Berita Acara', 'Pencapaian'],
        default: 'Pemberitahuan'
    },
    authorName: {
        type: String,
        default: 'Admin'
    },
    isNewItem: {
        type: Boolean,
        default: true
    },
    tanggal: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('News', NewsSchema)
