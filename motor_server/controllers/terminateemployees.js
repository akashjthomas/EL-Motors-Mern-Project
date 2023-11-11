const express = require("express");
const Employee=require("../model/employeemodel");
const Login =require("../model/loginmodel");
const router =express.Router();
//terminate
router.patch('', async (req, res) => {
    const { id } = req.params;
    const { status, email } = req.body;
    console.log(id);
    console.log(status);
    console.log(email);
    try {
        // Update the status of the employee in the database
        const [updatedEmployee, updatedLogin] =
            await Promise.all([
                Employee.findOneAndUpdate({ employee_email: email }, { status }, { new: true }),
                Login.findOneAndUpdate({ email }, { status }, { new: true }),
            ]);

        if (!updatedEmployee || !updatedLogin) {
            return res.status(404).json({ message: 'Failed to Update' });
        }

        return res.json({ updatedEmployee, message: 'employee terminated..' });
        
    } catch (error) {
        console.error('Error updating employee status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports=router;