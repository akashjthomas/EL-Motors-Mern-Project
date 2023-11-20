const express = require("express");
const Employee = require("../model/employeemodel");
const router = express.Router();

router.get('/:bookingId', async (req, res) => {
    try {
        const bookingId = req.params.bookingId; 
        console.log("bookingid",bookingId);
        const employees = await Employee.findById(bookingId); 
        console.log(employees);
        res.status(200).json(employees);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
