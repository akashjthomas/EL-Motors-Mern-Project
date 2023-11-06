const mongoose = require('mongoose');

const testdriveSchema = new mongoose.Schema({
    userId: String,
    model:String,
    timeSlot:String,
    date: Date,
});

const TestDrive = mongoose.model('TestDrive', testdriveSchema);

module.exports = TestDrive;
