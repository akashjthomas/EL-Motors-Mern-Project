const express = require("express");
const Otp = require("../model/reviewotpmodel");
const Location = require("../model/locationmodel");
const router = express.Router();

//-----------------------displaycategory------------------------------------------------

router.get('/:userId/:yourId/:id', async (req, res) => {
    const id = req.params.id;
    console.log("loc id",req.params);
    try {
        // Fetch the OTP
        const color = await Otp.findOne({ lid: id });
        console.log(color);
        
        // Update the document with the specified id to status "complete"
        const updatedColor = await Location.findByIdAndUpdate(id, { status: "complete" }, { new: true });

        // Send a single response with both results
        res.json({ color, updatedColor });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching color or updating status' });
    }
});

module.exports = router;
