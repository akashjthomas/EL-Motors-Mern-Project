const express = require("express");
const TestDrive = require('../model/testdrivemodel');
const router = express.Router();

// Add route to view test drive bookings
router.get('', async (req, res) => {
  try {
    // Fetch all test drive bookings from the database
    const testDrive = await TestDrive.find();

    // Return the test drive bookings as a response
    res.status(200).json(testDrive);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error retrieving test drive bookings' });
  }
});

module.exports = router;
