const express = require("express");
const Image = require("../model/imagemodel");
const router = express.Router();

//-----------------------displayimages------------------------------------------------

router.post('/:model/:engineNo', async (req, res) => {
    try {
        // Get the model name from the query parameter
      console.log(req.params);
        const modelName = req.params.model;
        const engineNo=req.params.engineNo;
       

        if (!modelName || !engineNo) {
            return res.status(400).json({ error: 'Model name is required in the query parameter' });
        }

        // Find images based on the specified car model
        const images = await Image.find({ model: modelName,engineNo: engineNo});
        console.log(images);

        res.json(images);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching images' });
    }
});

module.exports = router;
