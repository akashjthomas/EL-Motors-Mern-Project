const express = require('express');
const router = express.Router();
const Bill = require('../model/billmodel');

router.post('', async (req, res) => {
  try {
    console.log("billlll",req.body);
    const {
      userId,
      model,
      fuelSource,
      price,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      pincode,
      state,
      paymentId,
      amount,
    } = req.body;

    const newBill = new Bill({
      userId,
      model,
      fuelSource,
      price,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      pincode,
      state,
      paymentId,
      amount,
    });

    await newBill.save();

    res.status(201).json({ message: 'Bill saved successfully' });
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({ error: 'Error creating bill' });
  }
});

module.exports = router;
