const express = require("express");
const Employee=require("../model/employeemodel");
const router =express.Router();

router.get('', async (req, res) => {
    try {
        const employees = await Employee.find({employee_department:'service'});
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  });
 module.exports=router;