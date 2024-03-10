// routes/assistanceRoadRoutes.js

const express = require('express');
const router = express.Router();
const AssistanceRoad = require('../model/ResolvedRdAssist');

// Get all assistance roads
router.get('', async (req, res) => {
  try {
    const assistanceRoads = await AssistanceRoad.find();
    res.json(assistanceRoads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
