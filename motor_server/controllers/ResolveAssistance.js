const express = require("express");
const AssistanceRoad = require("../model/ResolvedRdAssist");
const Location = require("../model/locationmodel");
const router = express.Router();



router.post('', async (req, res) => {
    console.log(req.body);
    try {
        const { userId, emp, location } = req.body;

        

        // Generate a random 6-digit number
        const randomCode = Math.floor(100000 + Math.random() * 900000);

        // Create a new AssistanceRoad instance
        const assistanceRoad = new AssistanceRoad({
            userId,
            emp,
            location,
            verificationCode: randomCode // Add the random code to the AssistanceRoad instance
        });

        // Save the instance to the database
        await assistanceRoad.save();


        // Update the location status
        await Location.findByIdAndUpdate(location.locationId, { status: 'resolved' }, { new: true });

        const nodemailer = require('nodemailer');
        const emailUser = "akashthomas411@gmail.com";
        const emailPassword = "agno jpbl agns uory";

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: emailUser,
                pass: emailPassword,
            },
        });

        const mailOptions = {
            from: emailUser,
            to: emp,
            cc: location.userId, // Send mail to the location.userId as CC
            subject: 'Road Assistance Assigned',
            text: `A road side assistance with id ${location.locationId} has been assigned to you by ${userId}. Your verification code is: ${randomCode}. Login into your account and get more details.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(200).json({ message: 'Data stored successfully' });
    } catch (error) {
        console.error('Error saving location data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
