const express = require("express");
const Wear = require("../model/wearmodel");
const router = express.Router();

router.get('/:usermail', async (req, res) => {
    try {
        const userId = req.params.usermail;
      
        const bookings = await Wear.find({userId,status:'booked'}); // Filter bookings by userId
        console.log(bookings);
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
