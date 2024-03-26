const express = require("express");
const Insurance = require("../model/insurancemodel");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "akashthomas411@gmail.com",
    pass: "agno jpbl agns uory"
  }
});

// Function to send email notification
const sendEmailNotification = async (email, subject, message) => {
  try {
    const mailOptions = {
      from: 'akashthomas411@gmail.com',
      to: email,
      subject: subject,
      text: message
    };

    await transporter.sendMail(mailOptions);
    console.log('Email notification sent to:', email);
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw new Error('Failed to send email notification');
  }
};

// Scheduler Task to Update Expired Policies
const updateExpiredPolicies = async () => {
  try {
    const expiredPolicies = await Insurance.find({ policy_end: { $lt: new Date() }, status: { $ne: 'Rejected' } });
    if (expiredPolicies.length > 0) {
      await Promise.all(expiredPolicies.map(async (policy) => {
        policy.status = 'Rejected';
        await policy.save();
        // Send email notification to the user
        await sendEmailNotification(policy.userid, 'Insurance Renewal', 'Your insurance policy has expired. Please renew it immediately.');
      }));
      console.log('Expired policies updated to "Rejected" status.');
    } else {
      console.log('No expired policies found.');
    }
  } catch (error) {
    console.error('Error updating expired policies:', error);
  }
};

// Schedule the Task to Run Every Day at Midnight
cron.schedule('0 0 * * *', () => {
  updateExpiredPolicies();
}, {
  timezone: 'Asia/Kolkata'
});

// API endpoint for registering insurance policies
router.post('', upload.single('policyFile'), async (req, res) => {
  try {
    const { policy_type, policy_no, policy_date, policy_end, insured_name, invoice, regno, idv, Coverage, insurername, contact, userid } = req.body;
    const status = "Pending";

    // Create a new insurance policy object
    const newInsurance = new Insurance({
      policy_type,
      policy_no,
      policy_date,
      policy_end,
      insured_name,
      invoice,
      regno,
      idv,
      Coverage,
      insurername,
      contact,
      userid,
      policyFile: req.file.filename,
      status
    });

    // Save the new insurance policy
    const savedInsurance = await newInsurance.save();
    res.status(201).json({ message: 'Registration Successful', savedInsurance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
