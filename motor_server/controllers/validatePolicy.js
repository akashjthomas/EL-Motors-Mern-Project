const express = require("express");
const Insure = require("../model/insurancemodel");
const router = express.Router();

//-----------------------displayuser------------------------------------------------

router.get('/:policyNumber', async (req, res) => {
  const { policyNumber } = req.params;

  try {
    // Query the database to check if the policy number exists
    console.log(policyNumber, "policyNumber");
    const existingPolicy = await Insure.findOne({ policy_no: policyNumber,status: 'Approved'  });

    if (existingPolicy) {
      // Policy number exists, return success response with policy details
      return res.json({ isValid: true, policyDetails: existingPolicy });
    } else {
      // Policy number does not exist, return error response
      return res.json({ isValid: false, error: 'Policy number not found' });
    }
  } catch (error) {
    console.error('Error validating policy number:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
