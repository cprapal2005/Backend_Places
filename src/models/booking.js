const mongoose = require('mongoose')

const bookingSchema  = new mongoose.Schema({
    fecha_inicio: {
        type: Date,
        required: true
    },
    fecha_fin: {
        type: Date,
        required: true
    },
    cantidad_personas: {
        type: Number,
        required: true
    },
    precio_final: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    house_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'House'
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Booking  = mongoose.model('Booking ', bookingSchema)

module.exports = Booking 