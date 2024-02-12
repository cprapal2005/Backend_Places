const mongoose = require('mongoose')

const housePhotoSchema   = new mongoose.Schema({
    photo_url: {
        type: String,
        required: true
    },
    house_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'House'
    }
}, {
    timestamps: true
})

const HousePhoto = mongoose.model('HousePhoto', housePhotoSchema)

module.exports = HousePhoto