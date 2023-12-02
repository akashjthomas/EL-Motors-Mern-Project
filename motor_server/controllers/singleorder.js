const express = require("express");
const Booking = require("../model/bookingmodel");
const router = express.Router();

router.get('/:usermail', async (req, res) => {
    try {
        const userId = req.params.usermail;
      
        const bookings = await Booking.find({userId,status:'booked'}); // Filter bookings by userId
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
