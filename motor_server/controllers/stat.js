const express = require('express');
const router = express.Router();

const OverallStat = require('../model/overallstat');

router.get('', async (req, res) => {
    try {
      const overallStats = await OverallStat.find();
     

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

  module.exports = router;
  
  