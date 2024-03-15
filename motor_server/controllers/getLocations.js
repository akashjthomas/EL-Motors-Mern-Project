const express = require("express");
const Location = require("../model/locationmodel");
const router =express.Router();

router.get('', async (req, res) => {
    try {
        const locations = await Location.find({status:"complete"});
        res.status(200).json(locations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  });
 module.exports=router;