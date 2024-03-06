const express = require("express");
const Location = require("../model/locationmodel");
const router = express.Router();

router.post('/:userId/:vehicleRegNumber', async (req, res) => {
    try {
        const userId = req.params.userId; 
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const vehicleRegNumber=req.params.vehicleRegNumber;

        console.log("latitude", latitude);
        console.log("long", longitude);
        const location = new Location({ userId,latitude, longitude ,status: 'not resolved',vehicleRegNumber});
        await location.save();
        res.sendStatus(200);
    } catch (error) {
        console.error('Error saving location data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
