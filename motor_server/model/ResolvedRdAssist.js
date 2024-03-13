// models/AssistanceRoad.js

const mongoose = require('mongoose');

const assistanceRoadSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  emp: {
    type: String,
    required: true,
  },
  location: {
    locationId:{type:String,
      required:true,
      unique: true,},
    userId: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    vehicleRegNumber: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
 
},
{ timestamps: true }
);

const AssistanceRoad = mongoose.model('AssistanceRoad', assistanceRoadSchema);

module.exports = AssistanceRoad;
