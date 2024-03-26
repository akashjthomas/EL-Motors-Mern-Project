const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const insuranceSchema = new Schema({
  policy_type: {
    type: String,
    required: true
  },
  policy_no: {
    type: String,
    required: true,
    unique: true,
  },
  policy_date: {
    type: Date,
    required: true
  },
  policy_end: {
    type: Date,
    required: true
  },
  insured_name: {
    type: String,
    required: true
  },
  invoice: {
    type: String,
    required: true

  },
  regno: {
    type: String,
    required: true
  },
  idv: {
    type: String,
    required: true
  },
  Coverage: {
    type: String,
    required: true
  },
  insurername: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  userid:{
   type:String,
   required:true,
  },
  policyFile: {
   type:String,
   required:true,
  },
  status: {
    type: String,
    required:true,
  }
  // Add other fields as needed
});

const Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = Insurance;
