const express = require('express')
const House  = require('../models/house')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/houses', auth, async (req, res) => {
    const house = new House({
        user_id: req.body.user_id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        nombreOwner: req.body.nombreOwner,
        pais: req.body.pais,
        precio: req.body.precio
    });

    try {
        await house.save()
        res.status(201).send(house)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.get('/houses', async (req, res) => {
    try {
        const houses = await House.find();
        res.json(houses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/houses/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const house = await House.findOne({_id})

        if (!house) {
            return res.status(404).send()
        }

        res.send(house)
    } catch (e) {
        res.status(500).send({ error: error.message })
    }
})

router.patch('/houses/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['titulo', 'descripcion', 'direccion', 'ciudad', 'pais', 'precio', 'nombreOwner']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const house = await House.findOne({_id})

        if (!house) {
            return res.status(404).send()
        }

        updates.forEach((update) => house[update] = req.body[update])
        await house.save()
        res.send(house)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/houses/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const house = await House.findOneAndDelete({ _id })

        if (!house) {
            res.status(404).send()
        }

        res.send(house)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router