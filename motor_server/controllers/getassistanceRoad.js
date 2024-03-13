// routes/assistanceRoadRoutes.js

const express = require('express');
const router = express.Router();
const AssistanceRoad = require('../model/ResolvedRdAssist');

// Get assistance roads for a specific employee
router.get('/:emp', async (req, res) => {
  const emp = req.params.emp;

  try {
    // Query the database to find assistance roads with the specified emp
    const assistanceRoads = await AssistanceRoad.find({ emp: emp });

    // If there are no matching assistance roads, return a 404 status
    if (!assistanceRoads) {
      return res.status(404).json({ message: "No assistance roads found for the specified employee." });
    }

    // If assistance roads are found, return them as a JSON response
    res.json(assistanceRoads);
  } catch (error) {
    // If an error occurs, return a 500 status with an error message
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
