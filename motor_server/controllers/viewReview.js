// routes/assistanceRoadRoutes.js

const express = require('express');
const router = express.Router();
const Review = require('../model/reviewmodel');

// Get all assistance roads
router.get('', async (req, res) => {
  try {
    const review = await Review.find();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
