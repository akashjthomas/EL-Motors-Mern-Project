const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employee_firstName: {
    type: String,
    required: true,
  },
  employee_lastName: {
    type: String,
    required: true,
  },
  employee_email: {
    type: String,
    required: true,
    unique: true,
  },
  employee_phone: {
    type: String,
    required: true,
  },
  
  employee_department: {
    type: String,
    required: true,
  },
  employee_houseno: {
    type: String,
    required: true,
  },
  employee_streetAddress: {
    type: String,
    required: true,
  },
  employee_city: {
    type: String,
    required: true,
  },
  employee_state: {
    type: String,
    required: true,
  },
  employee_postalCode: {
    type: String,
    required: true,
  },
  employee_gender: {
    type: String,
    required: true,
  },
  employee_qualification: {
    type: String,
    required: true,
  },
  employee_document: {
    type: String,
    required: true,
  },
  status: {
        type: String,
        required: true,
    },
    workload: {
      type: Number,
      default: 0,
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
