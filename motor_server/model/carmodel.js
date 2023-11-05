const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  engineNo: {type:String,
    required: true,
    unique:true,
  },
  co: {type:String,
    required: true,},
  model: {type:String,
    required: true,},
  make: {type:String,
    required: true,},
  manufacturingYear:{ type:Number,
    required: true,},
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required:true,
    },
  cylinder: {type:String,
    required: true,},
  price: { type:Number, required: true,},
  fuelSource: {type:String, required: true,},
  interiorColor: {type:String, required: true,},
  interiorMaterial: {type:String, required: true,},
  airbags: { type:Number, required: true,},
  audioSystem: {type:String, required: true,},
  transmission: {type:String, required: true,},
  seats: { type:Number, required: true,},
  size: {type:String, required: true,},
  length: {type:String, required: true,},
  // color: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Color',
  //   required: true,
  // },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
