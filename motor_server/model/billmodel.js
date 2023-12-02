const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true,
  },
  
  model: {
    type: String,
    required: true,
  },
  fuelSource: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  state: {
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

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
