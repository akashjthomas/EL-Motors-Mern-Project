const express = require("express");
const Employee = require("../model/employeemodel");
const router = express.Router();

router.get('/:mail', async (req, res) => {
    try {
        const mail = req.params.mail; 
        console.log("mail",mail);
        const employees = await Employee.findOne({employee_email: mail}); 
        console.log(employees);
        res.status(200).json(employees);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
