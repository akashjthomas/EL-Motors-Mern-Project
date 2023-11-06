const express = require("express");
const Employee = require("../model/employeemodel");
const Login = require("../model/loginmodel");
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
function isValidEmail(email) {
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailPattern.test(email);
}

//---------------------------employee reg------------------------------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination directory where files will be saved
    cb(null, './public/cars');
  },
  filename: function (req, file, cb) {
    // Append a timestamp or unique identifier to the filename to avoid conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });



router.post('', upload.single('car_img'), async (req, res) => {
 
  try {
    const { fname, lname, email, phone, dept, houseno, saddress, ecity, estate, epostalcode, gender, qualification, password, cpassword } = req.body;

    const status = "Pending";
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    const newEmployee = new Employee({
      employee_firstName: fname,
      employee_lastName: lname,
      employee_email: email,
      employee_phone: phone,
      employee_department: dept,
      employee_houseno: houseno,
      employee_streetAddress: saddress,
      employee_city: ecity,
      employee_state: estate,
      employee_postalCode: epostalcode,
      employee_gender: gender,
      employee_qualification: qualification,
      employee_document: req.file.filename,
      status: "Pending"
    });
  
    const savedEmployee = await newEmployee.save();

    const saltRounds = 10;
    // Ensure that you are using the correct password field from your request data.
    const hashedPassword = await bcrypt.hash(password, saltRounds);
   
    
    const newLogin = new Login({
      email,
      password: hashedPassword,
      usertype: "employee",
      status: "Pending"
    });
  console.log(hashedPassword);
    const logdata = await newLogin.save();

    if (savedEmployee && logdata) {
      res.status(201).json({ message: 'Registration Successful', savedEmployee });
    }
  } catch (error) {
    if (error.code === 11000) {
      console.log("Email Duplication");
      res.json({ message: "You Already Registered" });
    } else {
      console.error(error);
      console.log("Server error");
      res.status(500).json({ message: 'Server error' });
    }
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/movie_poster/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

//----------------------------------------------------------------------------------


app.post('/api/addmovies', upload.single('poster_url'), async (req, res) => {
    try {
        const { title, genre, duration, release_date, language, description, director, production, cast, trailer_url, } = req.body;
        const filename = req.file ? req.file.path : '';
        const poster_url = path.basename(filename);
        const newMovie = new Movies({ title, genre, duration, release_date, language, description, director, production, cast, poster_url, trailer_url, });
        const result = await newMovie.save();
        if (result) {
            res.status(201).json({ message: 'Movie added successfully' });
        }

    } catch (error) {
        console.error('Error creating movie:', error);
        res.json({ message: "Opertaion Failed" });
    }
}
);



});

module.exports = router;
