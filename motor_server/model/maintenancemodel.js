const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
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
  bookingDate: {
    type: Date,
    default: Date.now, // Default to current date/time
},
});

const Maintenance = mongoose.model('Maintenance', maintenanceSchema);

module.exports = Maintenance;
