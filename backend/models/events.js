import mongoose from "mongoose";

const EvenScheme = new mongoose.Schema({
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


    

})

export default mongoose.model('Event', EvenScheme)