const express = require('express');
const auth = require('../middleware/auth');
const HousePhoto = require('../models/housePhoto');
const router = express.Router();

router.post('/house-photos', auth, async (req, res) => {
    const housePhoto  = new HousePhoto({
        photo_url: req.body.photo_url,
        house_id: req.body.house_id
    });

    try {
        await housePhoto.save();
        res.status(201).send(housePhoto);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/house-photos/:house_id', async (req, res) => {
    const house_id = req.params.house_id;

    try {
        const housePhotos = await HousePhoto.find({ house_id });

        if (!housePhotos) {
            return res.status(404).send();
        }

        res.send(housePhotos);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
