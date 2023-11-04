// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color',
    required: true,
  },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
