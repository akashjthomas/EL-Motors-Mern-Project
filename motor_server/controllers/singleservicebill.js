const express = require("express");
const Servicebill= require('../model/servicebill');
const router = express.Router();

router.get('/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params; // Access the paymentId parameter from req.params
        console.log("req from bill", req.params);
        
        const servicebill = await Servicebill.findOne({ paymentId });

        if (servicebill) {
            console.log(servicebill);
            // If a bill with the provided paymentId is found, return its id
            const billId = servicebill._id; // Assuming that the bill id is stored in the _id field
            console.log("billid",billId);

            res.json({ servicebill, message: "Get Single Bill Successfully" });
        } else {
            res.status(404).json({ error: 'Bill not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching bill' });
    }
});

module.exports = router;
