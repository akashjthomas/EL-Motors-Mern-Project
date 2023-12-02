const express = require("express");
const Booking = require('../model/bookingmodel');
const router = express.Router();

router.get('/:empid', async (req, res) => {
    try {
        const empid = req.params.empid; // Retrieve empid from URL parameters
        const booking = await Booking.find({ scheduledEmployee: empid,status: 'booked' });

        console.log("scemp", booking);
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching booking' });
    }
});

module.exports = router;
