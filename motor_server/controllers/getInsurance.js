const express = require("express");
const Insurance = require('../model/insurancemodel');
const router = express.Router();

router.get('', async (req, res) => {
    try {
        // Retrieve regno from URL parameters
        const booking = await Insurance.find();

        console.log("scemp", booking);
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching booking' });
    }
});

module.exports = router;
