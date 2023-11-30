const mongoose = require('mongoose');
 
const bookingSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    model:{
        type:String,
        required:true,  
    },
    fuelSource: {type:String, required: true,},
    price: { type:Number, required: true,},
    mobileNo: { type: String, required: true },
    firstName:{ type: String, required: true },
    lastName: { type: String, required: true },
    addressLine1:{ type: String, required: true },
    addressLine2:{ type: String, required: true },
    pincode: {
        type: String,
        required: true,
      },
     state: {
        type: String,
        required: true,
      },
      city : {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
    },
    deliverystatus: {
      type: String,
      required: true,
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
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports=Booking;