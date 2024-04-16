const express = require("express");
const FreeService = require('../model/freeservicemodel');
const router = express.Router();

router.get('/:bookingid', async (req, res) => {
    try {
        const id = req.params.bookingid; // Retrieve empid from URL parameters
        const booking = await FreeService.find({ _id:id});

        console.log("scemp", booking);
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching booking' });
    }
});

module.exports = router;
