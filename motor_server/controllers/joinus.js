const express = require("express");
const Employee=require("../model/employeemodel");
const Login = require("../model/loginmodel");
const router =express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
//---------------------------employee reg------------------------------------------------

  
router.post('', async (req, res) => {
    try {
        const { fname, lname, email, phone, dept, houseno, saddress, ecity,  estate, epostalcode, gender, qualification, password, cpassword } = req.body;
        const status = "Pending";
        const newEmployee = new Employee(
            {
                employee_firstName:fname,
                employee_lastName: lname,
                employee_email: email,
                employee_phone: phone,
                employee_department:dept,
                employee_houseno:houseno,
                employee_streetAddress:saddress,
                employee_city:ecity,
                employee_state:estate,
                employee_postalCode: epostalcode,
                employee_gender:gender,
                employee_qualification:qualification ,
                status: "Pending"
            }
           
        )
        
        const savedEmployee = await newEmployee.save();
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newLogin = new Login({
            email,                                                                                     
            password: hashedPassword,
            usertype: "employee",
            status: "Pending"
        });
       
        const logdata = await newLogin.save();
        if (savedEmployee && logdata) {
            res.status(201).json({ message: 'Registration Successful', savedEmployee });
        }
    } catch (error) {
        if (error.code === 11000) {
            console.log("---------------------------------")
            console.log("Email Duplication")
            console.log("---------------------------------")
            res.json({ message: "You Already Registered" });
        }
        else {
            console.error(error);
            console.log("Server error")
            res.status(500).json({ message: 'Server error' });
        }

      }
});
module.exports=router;
