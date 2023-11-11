const express = require("express");
const Image = require("../model/imagemodel");
const router =express.Router();

//-----------------------displayimages------------------------------------------------

router.get('', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching images' });
    }
});
 module.exports=router;