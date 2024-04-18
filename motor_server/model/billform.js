const mongoose = require('mongoose');

const billformSchema = new mongoose.Schema({
    OilChange: {
    type: String,
    required: true
  },
  BrakeInspection: {
    type: String,
    required: true
  },
  TireRotation: {
    type: String,
    required: true
  },
  EngineTuneup: {
    type: String,
    required: true
  },
  FluidTopup:{
   type:String,
   required:true,
  },
  AirFilterReplacement: {
    type: String,
    required: true,
  },
  Other: {
    type: String,
    required: true,
  },
  Labor:{
    type:String,
    required: true,
  },

  Parts: {
    type: String,
    required:true,
},
Tax: {
  type: String,
  required: true,
},
Total:{type: String,
  required: true,},

});

const BillForm = mongoose.model('BillForm', billformSchema);

module.exports = BillForm;

