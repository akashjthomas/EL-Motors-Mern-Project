const express = require("express");
const Category = require("../model/categorymodel");
const router =express.Router();

//-----------------------displaycategory------------------------------------------------

router.get('', async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching category' });
    }
});
 module.exports=router;