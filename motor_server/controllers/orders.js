const express = require("express");
const Booking=require("../model/bookingmodel");
const router =express.Router();

router.get('', async (req, res) => {
    try {
        const bookings = await Booking.find({ status: 'booked' });
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  });
 module.exports=router;