const mongoose = require('mongoose');

const servicebillSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
  },
  
  model: {
    type: String,
    required: true,
  },

  paymentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

  bookingDate: {
    type: Date,
    default: Date.now, // Default to current date/time
},
  // Any other fields you might want to include
});

const Servicebill = mongoose.model('Servicebill', servicebillSchema);

module.exports = Servicebill;
