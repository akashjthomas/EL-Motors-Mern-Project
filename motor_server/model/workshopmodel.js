const mongoose = require('mongoose');
 
const workshopSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    }

    
  
})

const Workshop = mongoose.model('Workshop', workshopSchema);

module.exports=Workshop;