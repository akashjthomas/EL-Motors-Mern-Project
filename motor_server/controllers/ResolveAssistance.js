const express = require("express");
const AssistanceRoad = require("../model/ResolvedRdAssist");
const Location=require("../model/locationmodel")
const router = express.Router();

router.post('', async (req, res) => {
    console.log(req.body);
    try {
        
        const { userId, emp, location } = req.body;

    // Create a new AssistanceRoad instance
    const assistanceRoad = new AssistanceRoad({
      userId,
      emp,
      location,
    });

    // Save the instance to the database
    await assistanceRoad.save();
   
    await Location.findByIdAndUpdate(location.locationId, {status:'resolved'},{ new: true });

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
 subject: 'Road Assistance Assigned',
 text: `a road side assistance has been assigned to you  by ${userId},login into your account and get more details
 <p>Please <a href="http://localhost:3000/adminhome">click here</a> to go to the admin home page.</>`
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
