const express = require("express");
const FreeService = require("../model/freeservicemodel");
const router = express.Router();

//-----------------------displayimages------------------------------------------------

router.get('/:selecteddate', async (req, res) => {
    try {
        const { selecteddate } = req.params; // Retrieve date from query parameters
        console.log(selecteddate);
        
        // Count the number of bookings for the specified date
        const bookingsCount = await FreeService.countDocuments({ selectedDate: { $gte: new Date(selecteddate), $lt: new Date(selecteddate + 'T23:59:59.999Z') } });
        
        console.log(bookingsCount);
        
        // Send the count as JSON response
        res.json({ count: bookingsCount });
    } catch (error) {
        console.error('Error counting bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
