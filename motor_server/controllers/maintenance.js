const express = require("express");
const Maintenance = require('../model/maintenancemodel');
const router = express.Router();

// Add route
router.post('', async (req, res) => {
    try {
        // Validate request body
        const { userId, selectedService, vin,Models, selectedOptions } = req.body;
        console.log('userId',userId);
        console.log('selectedService',selectedService);
        console.log(selectedOptions);
        console.log(vin);
        console.log('maintanence',req.body);
        if (!userId || !selectedService || !vin || !Models || !selectedOptions || selectedOptions.length === 0) {
            return res.status(400).json({ error: 'All fields are required and selectedOptions cannot be empty' });
        }

        // Save maintenance data
        const maintenance = await new Maintenance({
            userId,
            selectedService,
            vin,
            Models,
            selectedOptions
        }).save();
       console.log('maintenance saved',maintenance);
        res.status(201).json({ maintenance, message: 'service request for Maintenance added successfully' });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add service request maintenance data' });
    }
});

module.exports = router;
