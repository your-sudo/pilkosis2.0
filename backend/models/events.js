import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    judul: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    location: {
        type: String
    },
    type: {
        type: String,
        enum: ['meeting', 'social', 'academic', 'sports'],
        default: 'academic'
    }
})

export default mongoose.model('Event', EventSchema)