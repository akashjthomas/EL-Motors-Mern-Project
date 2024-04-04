const express = require("express");
const router = express.Router();
const FreeService = require("../model/freeservicemodel");
// Store generated OTPs temporarily (in real-world scenario, use a database)
const otpCache = {};

// Route for verifying OTP
router.post('/:userId/:id', async (req, res) => {
    console.log(req.body);
    try {
        const userId = req.params.userId; // Extract userId from the URL
        const bookingId = req.params.id;
        console.log(userId);
        const { otp } = req.body;
        console.log("otpp",otp);

        otpCache[userId] = otp;
        // Check if OTP exists in cache for the user
        if (!otpCache[userId]) {
            console.log("control",otpCache[userId]);
            return res.status(400).json({ message: 'OTP expired or not generated' });
        }

        // Verify OTP
        if (otpCache[userId] === otp) {
            console.log("control2",otpCache[userId]);
            // Clear OTP from cache after successful verification
            delete otpCache[userId];
            await FreeService.findOneAndUpdate({ _id: bookingId }, { status: "Delivered" });
            return res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
