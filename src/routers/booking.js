const express = require('express')
const Booking  = require('../models/booking')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/bookings', auth, async (req, res) => {
    const booking  = new Booking({
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        cantidad_personas: req.body.cantidad_personas,
        precio_final: req.body.precio_final,
        user_id: req.body.user_id,
        house_id: req.body.house_id,
        owner_id: req.body.owner_id
    });

    try {
        await booking .save()
        res.status(201).send(booking )
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/booking', auth, async (req, res) => {

    try {
        const bookings  = await Booking.find()

        let booking = [];

        bookings.forEach(book => {
            if(book.user_id==req.user.id) booking.push(book);
        });

        if (!booking) {
            return res.status(404).send()
        }

        res.send(booking)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/bookings/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const booking = await Booking.findOneAndDelete({ _id })

        if (!booking) {
            res.status(404).send()
        }

        res.send(booking)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router