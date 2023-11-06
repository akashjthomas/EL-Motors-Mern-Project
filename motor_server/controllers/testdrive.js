const express = require("express");
const TestDrive = require('../model/testdrivemodel');
const router = express.Router();

// Add route
router.post('', async (req, res) => {
  try {
    const { userId, model, timeSlot, date } = req.body;

    // Check if a test drive with the same model, time slot, and date already exists
    const existingTestDrive = await TestDrive.findOne({ model, timeSlot, date });
    console.log("Existing test drive:", existingTestDrive);

    if (existingTestDrive) {
      // A test drive with the same model, time slot, and date already exists
      return res.status(400).json({ error: 'Test drive for this model, time slot, and date already exists' });
    }

    // Check if a test drive with the same userId, date, and timeSlot already exists
    const userTestDrive = await TestDrive.findOne({ userId, timeSlot, date });
    console.log("User test drive:", userTestDrive);

    if (userTestDrive) {
      // A test drive for the same user, date, and time slot already exists
      return res.status(400).json({ error: 'Test drive for this user, date, and time slot already exists' });
    }

    const testdrive = new TestDrive({ userId, model, timeSlot, date });
    const result = await testdrive.save();

    if (result) {
      console.log('Test drive scheduled:', testdrive);
      res.status(201).json({ message: 'Test drive scheduled successfully' });
    } else {
      console.log('Failed to save test drive:', testdrive);
      res.status(500).json({ error: 'Error scheduling test drive' });
    }
    ///test drive email///////////
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
  to: userId,
  subject: 'Test Drive Booking Acknowledgment',
  text: `Thank you for booking a test drive. Your booking has been confirmed.,
  Date: ${date}
    Model: ${model}
    Time Slot: ${timeSlot}`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error scheduling test drive' });
  }
});

module.exports = router;
