const express = require("express");
const Servicebill = require('../model/servicebill');
const router = express.Router();

router.get('/:usermail', async (req, res) => {
    try {
        const { usermail } = req.params;
        console.log("req from bill", req.params);
        
        // Calculate the date 2 months ago from the current date
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

        // Find service bills for the specified user within the last 2 months
        const servicebill = await Servicebill.find({
            userId: usermail,
            bookingDate: { $gte: twoMonthsAgo } // Retrieve records with bookingDate greater than or equal to two months ago
        });

        console.log(servicebill);
        res.json({ servicebill, message: "Get Single Bill Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching bill' });
    }
});

module.exports = router;
