const express = require("express");
const Location = require("../model/locationmodel");
const router = express.Router();

router.put('/:locationId', async (req, res) => {
    try {
        const locationId = req.params.locationId;
        const updatedLocation = await Location.findByIdAndUpdate(locationId, { new: true });
        // The { new: true } option ensures that the updated document is returned
        
        if (!updatedLocation) {
            return res.status(404).json({ message: 'Location not found' });
        }

        res.status(200).json(updatedLocation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
