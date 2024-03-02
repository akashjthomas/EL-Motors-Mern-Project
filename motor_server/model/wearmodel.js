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
    required: true
  },
  Models:{
   type:String,
   required:true
  },
  selectedOptions: {
    type: [String],
    required: true
  },
  pickupAddress:{
    type:[String],
  },

  pinCode:{
    type: String,
  },
  scheduledEmployee: {
    type: String,
    ref: 'Employee',
  },
  bookingDate: {
    type: Date,
    default: Date.now, // Default to current date/time
},
paymentId: {
  type: String,
  required: true,
},
status: {
  type: String,
  required: true,
},
pickupstatus:{
  type:String,
  required:true,
},
selectedDate:{
  type:String,
  required:true
}
});

const Wear = mongoose.model('Wear', wearSchema);

module.exports =Wear;
