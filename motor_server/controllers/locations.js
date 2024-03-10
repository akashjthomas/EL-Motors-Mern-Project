const express = require("express");
const Location = require("../model/locationmodel");
const router = express.Router();

router.post('/:userId/:vehicleRegNumber/:phoneNumber', async (req, res) => {
    try {
        const userId = req.params.userId; 
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const vehicleRegNumber=req.params.vehicleRegNumber;
        const phoneNumber=req.params.phoneNumber;
        const lastLocation = await Location.findOne({
            userId: userId,
            createdAt: { $gte: new Date(Date.now() - 15 * 60 * 1000) } // Check within the last 15 minutes
        });

        if (lastLocation) {
            // If a record exists, send a response indicating that the user has already requested assistance
            return res.status(400).json({ message: "You have already requested assistance recently. Please wait before requesting again." });
        }
        console.log("latitude", latitude);
        console.log("long", longitude);
        const location = new Location({ userId,latitude, longitude ,status: 'not resolved',vehicleRegNumber,phoneNumber});
        await location.save();
        res.sendStatus(200);
    } catch (error) {
        console.error('Error saving location data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
