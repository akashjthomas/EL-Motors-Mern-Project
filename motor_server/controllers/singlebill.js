const express = require("express");
const Bill = require('../model/billmodel');
const router = express.Router();

router.get('/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params; // Access the paymentId parameter from req.params
        console.log("req from bill", req.params);
        
        const bill = await Bill.findOne({ paymentId });

        if (bill) {
            console.log(bill);
            // If a bill with the provided paymentId is found, return its id
            const billId = bill._id; // Assuming that the bill id is stored in the _id field
            console.log("billid",billId);

            res.json({ bill, message: "Get Single Bill Successfully" });
        } else {
            res.status(404).json({ error: 'Bill not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching bill' });
    }
});

module.exports = router;
