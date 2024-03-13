// controllers/assistanceController.js
const express = require("express");
const Review = require('../model/reviewmodel');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination directory where files will be saved
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    // Append a timestamp or unique identifier to the filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Controller to handle the submission of review data
router.post('', upload.single('image'),async (req, res) => {
  try {
    const { id, yourId, vehicleRegNum, userId, problemSolved, image } = req.body;
    const existingReviewsCount = await Review.countDocuments({ id });

    if (existingReviewsCount >= 2) {
      return res.status(400).json({ error: 'Cannot submit more than two reviews with the same ID' });
    }
    // Create a new instance of Review model
    const review = new Review({
      id:id,
      yourId:yourId,
      vehicleRegNum:vehicleRegNum,
      userId:userId,
      problemSolved:problemSolved,
      image:req.file.filename
    });

    // Save the review data to the database
    await review.save();

    res.status(200).json({ message: 'Review data saved successfully' });
  } catch (error) {
    console.error('Error saving review data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
