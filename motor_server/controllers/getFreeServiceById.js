const express = require("express");
const FreeService = require("../model/freeservicemodel");
const router = express.Router();
const nodemailer = require("nodemailer");


const emailUser = "akashthomas411@gmail.com";
const emailPassword = "agno jpbl agns uory";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

// Store generated OTPs temporarily (in real-world scenario, use a database)
const otpCache = {};

// Function to generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

router.get('/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
      
        const booking = await FreeService.findById(bookingId); // Find booking by ID
        console.log(booking);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Generate OTP
        const otp = generateOTP();
        
        // Store OTP in cache
        otpCache[booking.userId] = otp;

        // Send email with OTP to user associated with the booking
        const mailOptions = {
            from: emailUser,
            to: booking.userId, // Assuming userId is the email address of the user
            subject: 'OTP for Booking Verification',
            text: `Your OTP for booking verification is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(200).json({ 
            message: 'OTP sent to your email',
            otp: otp,
            booking: booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
