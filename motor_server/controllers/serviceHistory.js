const express = require("express");
const FreeService = require('../model/freeservicemodel');
const router = express.Router();

router.get('/:_id', async (req, res) => {
    try {
        const empid = req.params._id; // Retrieve empid from URL parameters
        console.log("empid",empid);
        const booking = await FreeService.find({ scheduledEmployee: empid, status: { $in: ['Delivered', 'Canceled'] } });

        console.log("scemp", booking);
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching booking' });
    }
});

module.exports = router;
