const express = require("express");
const FreeService = require("../model/freeservicemodel");
const router = express.Router();

router.get('/:usermail', async (req, res) => {
    try {
        const userId = req.params.usermail;
      
        const bookings = await FreeService.find({ userId, status: { $nin: ['canceled', 'Delivered'] } }); // Filter bookings by userId
        console.log(bookings);
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
