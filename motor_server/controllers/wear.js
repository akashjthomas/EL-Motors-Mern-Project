const express = require("express");
const Wear = require('../model/wearmodel');
const router = express.Router();

// Add route
router.post('', async (req, res) => {
    try {
        // Validate request body
        const { userId, selectedService, vin, Models, selectedOptions } = req.body;
        console.log('userId',userId);
        console.log('selectedService',selectedService);
        console.log(selectedOptions);
        console.log(vin);
        console.log(Models);
        console.log('wear',req.body);
        if (!userId || !selectedService || !vin || !Models || !selectedOptions || (selectedOptions.length === 0)) {
            return res.status(400).json({ error: 'All fields are required and selectedOptions cannot be empty' });
        }
        const existingWear = await Wear.findOne({ vin });
        if (existingWear) {
            return res.status(400).json({ error: 'VIN already exists' });
        }

        // Save wear data
        const wear = await new Wear({
            userId,
            selectedService,
            vin,
            Models,
            selectedOptions
        }).save();
       console.log('wear saved',wear);
        res.status(201).json({ wear, message:'service requested for wear and tear successfully' });
       
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add service(wear and tear) data' });
    }
});

module.exports = router;
