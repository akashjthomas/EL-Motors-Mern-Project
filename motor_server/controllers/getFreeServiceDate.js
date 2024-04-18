const express = require("express");
const FreeService = require("../model/freeservicemodel");
const router = express.Router();

//-----------------------displayimages------------------------------------------------

router.get('/:selectedDate', async (req, res) => {
    try {
      
        // Count the number of bookings for the specified date
        const bookingsCount = await FreeService.find({ selectedDate: date }); // Assuming 'selectedDate' is the field name in your model
        console.log(bookingsCount);
        // Send the count as JSON response
        res.json({ count: bookingsCount });
    } catch (error) {
        console.error('Error counting bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
