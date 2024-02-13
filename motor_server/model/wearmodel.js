const mongoose = require('mongoose');

const wearSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  selectedService: {
    type: String,
    required: true
  },
  vin: {
    type: String,
    required: true,
    unique: true
  },
  Models:{
    type:String,
    required:true
   },
  selectedOptions: {
    type: [String],
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now, // Default to current date/time
},
});

const Wear = mongoose.model('Wear', wearSchema);

module.exports = Wear;
