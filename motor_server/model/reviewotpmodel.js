const mongoose = require('mongoose');
 
const reviewotpSchema = new mongoose.Schema({
  lid:{
    type:String,
        required:true,
  },
    email:{
        type:String,
        required:true,
    },
  userId:{
    type:String,
        required:true,
  },
    otp:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, 
      },
})

const Reviewotp = mongoose.model('Reviewotp', reviewotpSchema);

module.exports=Reviewotp;