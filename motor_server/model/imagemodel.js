// models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  
  url: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    ref: 'Color',
    required: true,
  },
  model:{
    type: String,
    ref: 'Car',
    required: true,
  },
  engineNo: {
    type: String,
    ref: 'Car',
    required: true,
  },
});


const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
