const express = require("express");
const Car= require('../model/carmodel');
const router =express.Router();

router.get('', async (req, res) => {
    try {
        const models = await Car.find().distinct('model');
        res.json(models);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
    
    module.exports = router;