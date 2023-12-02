const express = require("express");
const TestDrive = require('../model/testdrivemodel');
const router = express.Router();

// Add route to view test drive bookings for today
router.get('', async (req, res) => {
  try {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to midnight for accurate comparison

    // Find test drive bookings with the date matching today's date
    const testDrive = await TestDrive.find({
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
    });

    // Return the test drive bookings for today as a response
    res.status(200).json(testDrive);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Error retrieving test drive bookings for today' });
  }
});

module.exports = router;
