const express = require("express");
const Employee=require("../model/employeemodel");
const router =express.Router();

router.post('', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  });
 module.exports=router;