const express = require("express");
const Workshop = require('../model/workshopmodel');
const router = express.Router();

// Add route
router.post('', async (req, res) => {
    try {
        // Extract data from the request body
        const { name, address, phone } = req.body;

        // Create a new instance of the Workshop model
        const newWorkshop = new Workshop({
            name,
            address,
            phone
        });

        // Save the new workshop to the database
        await newWorkshop.save();

        // Send a success response to the client
        res.status(201).json({ message: 'Workshop added successfully', workshop: newWorkshop });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: 'Error adding workshop' });
    }
});

module.exports = router;
