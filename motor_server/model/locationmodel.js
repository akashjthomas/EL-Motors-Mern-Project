const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
  },
  
  latitude: {
    type: String,
    required: true,
  },

  longitude: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
},
},

{ timestamps: true });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
