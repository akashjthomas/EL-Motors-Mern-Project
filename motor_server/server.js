const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const port = 5000;
//const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const User = require("./model/usermodel");
const Login = require("./model/loginmodel");
const Employee=require("./model/employeemodel");



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/elmotors', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


const getalluser=require('./controllers/getallusers');
app.use('/api/getalluser',getalluser);



//............user register......//
app.post('/api/register', async (req, res) => {
    try {


        const { username, email, phone, dob, password } = req.body;
        const user = new User({ username, email, phone, dob });
        const status = await user.save();
        if (status) {

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newLogin = new Login({
                email,
                password: hashedPassword,
                usertype: "user",
                status: "Authorised"
            });
            const status2 = await newLogin.save();

            if (status2) {
                console.log('User registered:', newLogin);
                res.status(201).json({ message: 'Registration Successful' });
            }
        }

    }
    catch (error) {

        if (error.code === 11000) {
            console.log("---------------------------------")
            console.log("Email Duplication")
            console.log("---------------------------------")
            res.json({ message: "User Already Exist" });
        } else {
            console.error(error);
            console.log("Server error")
            res.status(500).json({ message: 'Server error' });
        }
    }

})

//----------------------------------login---------------------------------------------



app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body.email);
    console.log(req.body.password);
    try {
        const existingLogin = await Login.findOne({ email });

        if (existingLogin) {
            const passwordMatch = await bcrypt.compare(password, existingLogin.password);
            if (passwordMatch) {
                console.log('Login successful:', existingLogin);
                res.json({ message: 'userexist', existingLogin });
            } else {
                console.log('Invalid credentials');
                res.json({ message: 'no_user' });
            }
        } else {
            const existingLogin = {
                usertype: 'nouser',
                status: 'Not-Authorised',
            };
            console.log('Invalid credentials');
            res.json({ message: 'Invalid credentials', existingLogin });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});


//==================================deleteuser====================================================

app.delete('/deleteuser/:id', async (req, res) => {
    const { id } = req.params;
    const deleteUser = req.body;
  
    try {
      await User.findByIdAndDelete(id, deleteUser);
      res.status(200).json({ msg: 'User deleted  successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
  });

//---------------------------employee reg------------------------------------------------

app.post('/api/joinus', async (req, res) => {
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

//-----------------------------------------------------------------------------
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

/////////////////////approve employess//////////
app.patch('/api/approveemployees/:id', async (req, res) => {
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

        return res.json({ updatedEmployee, message: 'employee Approved..' });
    } catch (error) {
        console.error('Error updating employee status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
/////
const nodemailer = require('nodemailer');

const emailUser = "akashthomas411@gmail.com";
const emailPassword = "agno jpbl agns uory";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

let storedOtps = {}; // Store OTPs for different users

app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Store the OTP in the user's record (in a production app, you'd use a database)
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User not found!!!",
      });
    }

    // Store the OTP for this user
    storedOtps[email] = otp;

    // Send the OTP via email
    const mailOptions = {
      from: emailUser,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for password reset: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("OTP email sent:", info.response);
      res.status(200).json({ 
        success: true,
        message: "OTP sent successfully." });
    });
  } catch (error) {
    console.error("Error saving OTP:", error);
    return res.status(500).json({ 
      error: "Internal Server Error" });
  }
});

// Verify OTP and reset password
app.post('/api/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  console.log(email, otp, newPassword);
  
  try {
    const user = await User.findOne({ email });
    
    console.log(user);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: "User not found!!!",
      });
    }

    // Check if the provided OTP matches the stored OTP for this user
    if (storedOtps[email] !== otp) {
      console.log(otp);
      console.log(storedOtps[email]);
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Update the user's password and clear the OTP
    const login = await Login.findOne({ email });
    console.log(newPassword);
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    console.log(hashPassword);
    login.password = hashPassword;
    delete storedOtps[email]; // Clear the OTP for this user
    await login.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


  
    app.listen(port, ()=> 
    console.log(`server listening on port ${port}!`))