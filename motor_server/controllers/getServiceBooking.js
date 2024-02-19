const express = require("express");
const Maintenance = require('../model/maintenancemodel');
const router = express.Router();

router.get('/:empid', async (req, res) => {
    try {
        const empid = req.params.empid; // Retrieve empid from URL parameters
        const booking = await Maintenance.find({ scheduledEmployee: empid,status: 'booked' ,selectedService:'Maintenance'});

        console.log("scemp", booking);
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching booking' });
    }
});

module.exports = router;
