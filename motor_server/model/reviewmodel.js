

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  yourId: {
    type: String,
    required: true,
  },
  vehicleRegNum: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  problemSolved: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  image: {
    type: String, // You can store the image URL here
    required: true,
  },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
