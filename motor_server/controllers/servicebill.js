const express = require('express');
const router = express.Router();
const Servicebill = require('../model/servicebill');

router.post('', async (req, res) => {
  try {
    console.log("servicebill",req.body);
    const {
      userId,
      model,
      paymentId,
      amount,
    } = req.body;

    const newServicebill = new Servicebill({
      userId,
      model,
      paymentId,
      amount,
    });

    await newServicebill.save();

    res.status(201).json({ message: 'Bill saved successfully' });
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({ error: 'Error creating bill' });
  }
});

module.exports = router;
