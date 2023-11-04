const express = require("express");
const Color = require("../model/colormodel");
const router =express.Router();

//-----------------------displaycategory------------------------------------------------

router.get('', async (req, res) => {
    try {
        const color = await Color.find();
        res.json(color);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching color' });
    }
});
 module.exports=router;