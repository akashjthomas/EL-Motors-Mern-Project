const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Set as unique
    phone: { type: String, required: true },
    dob: { type: Date, required: true }, 
    designation:{type:String,required:true}
});


const User = mongoose.model('User', userSchema);

module.exports = User;

