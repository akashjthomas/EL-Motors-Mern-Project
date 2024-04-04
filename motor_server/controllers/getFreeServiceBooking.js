const express = require("express");
const FreeService = require('../model/freeservicemodel');
const router = express.Router();

router.get('/:empid', async (req, res) => {
    try {
        const empid = req.params.empid; // Retrieve empid from URL parameters
        const booking = await FreeService.find({ scheduledEmployee: empid,status:{$nin: ['canceled', 'Delivered'] }});

        console.log("scemp", booking);
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching booking' });
    }
});

module.exports = router;
