const express = require('express');
const nodemailer = require('nodemailer');
const Reviewotp = require('../model/reviewotpmodel');
const router = express.Router();

// Function to generate a random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post('/:id', async (req, res) => {
    try {
        // Extract the data from the request body
        const { yourId, userId } = req.body;
        const id=req.params.id;
        console.log(req.body)

        // Generate a random 6-digit OTP
        const otp = generateOTP();

        // Send the OTP to the email provided by userId
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'akashthomas411@gmail.com', // Replace with your email
                pass: 'agno jpbl agns uory' // Replace with your email password
            }
        });

        const mailOptions = {
            from: 'akashthomas411@gmail.com', // Replace with your email
            to: userId, // userId should be the email address to send the OTP
            subject: 'OTP for verification',
            text: `Your OTP is ${otp}.`
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                console.log('Email sent:', info.response);

                // Create a new Reviewotp document and save it to the database
                const newReviewotp = new Reviewotp({
                    lid:id,
                    userId: userId,
                    otp: otp,
                    email:yourId
                });
                await newReviewotp.save();

                // Send a success response
                res.status(200).json({ message: 'Data stored successfully' });
            }
        });
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error storing data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
