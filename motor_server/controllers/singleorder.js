const express = require("express");
const Booking = require("../model/bookingmodel");
const router = express.Router();

router.get('/:usermail', async (req, res) => {
    try {
        const userId = req.params.usermail;
        console.log("booking",userId)
        const bookings = await Booking.find({userId}); // Filter bookings by userId
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
