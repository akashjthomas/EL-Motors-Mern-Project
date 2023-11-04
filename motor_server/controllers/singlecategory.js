const express = require("express");
const Category= require('../model/categorymodel');
const router =express.Router();


router.get('', async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        res.json({category, message : "Get SIngle Category SUccessfully"});
    } catch (err) {
        res.status(500).json({ error: 'Error fetching category' });
    }
});

  module.exports=router;