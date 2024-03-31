const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  policyType: {
    type: String,
    required: true
  },
  policyExpiryDate: {
    type: String,
    required: true
  },
  policyNo: {
    type: String,
    required: true
  },
  model:{
   type:String,
   required:true,
  },
  serviceType: {
    type: String,
    required: true,
  },
  scheduledEmployee: {
    type: String,
    ref: 'Employee',
  },
  regno:{
    type:String,
    required: true,
  },

  bookingDate: {
    type: Date,
    default: Date.now, // Default to current date/time
},
paymentId: {
  type: String,
  required: true,
},
amount:{type: String,
  required: true,},
status: {
  type: String,
  required: true,
},
selectedDate:{
  type:String,
  required:true
}
});

const FreeService = mongoose.model('FreeService', maintenanceSchema);

module.exports = FreeService;
