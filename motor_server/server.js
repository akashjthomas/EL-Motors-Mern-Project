const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const port = 5000;
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const User = require("./model/usermodel");
const Login = require("./model/loginmodel");
const Employee=require("./model/employeemodel");
const Car=require("./model/carmodel");
const Image=require("./model/imagemodel");
const razorpay = require('razorpay');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/downloads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/public', express.static('public'));
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

const joinus=require('./controllers/joinus');
app.use('/api/joinus',joinus);

const employees=require('./controllers/employees');
app.use('/api/employees',employees);

const approveemployees=require('./controllers/approveemployees');
app.use('/api/approveemployees/:id',approveemployees);

const terminateemployees=require('./controllers/terminateemployees');
app.use('/api/terminateemployees/:id',terminateemployees);

const categoryroute=require('./controllers/categoryroute');
app.use('/api/addcatergory',categoryroute);

const addcolor=require('./controllers/addcolors');
app.use('/api/addcolor',addcolor);
const getcolor =require('./controllers/getcolor');
app.use('/api/getcolor',getcolor);

const getcategory=require('./controllers/getcategory');
app.use('/api/get-category',getcategory);

const singlecategory=require('./controllers/singlecategory');
app.use('/api/single-category',singlecategory);

const addcars=require('./controllers/addcars');
app.use('/api/addCars',addcars);

const updatecategory=require('./controllers/updatecategory');
app.use('/api/updatecat',updatecategory);

const getmodel=require('./controllers/getmodel');
app.use('/api/getmodel',getmodel);

const testdrivemodel=require('./controllers/testdrive');
app.use('/api/bookdrive',testdrivemodel);

const getalltestdrive=require('./controllers/getalltestdrive');
app.use('/api/driveview',getalltestdrive);

const filter=require('./controllers/filter');
app.use('/api/filterByCategory/:categoryName',filter);

const getimage=require('./controllers/getimages');
app.use('/api/getimage',getimage);

const blockuser=require('./controllers/blockuser');
app.use('/api/blockuser/:email',blockuser);
const approveuser=require('./controllers/approveuser');
app.use('/api/approveuser/:email',approveuser);
const getalllogin=require('./controllers/getalllogin');
app.use('/api/getalllogin',getalllogin);

const singleimage=require('./controllers/singleimage');
app.use('/api/carimages',singleimage);

const booking=require('./controllers/booking');
app.use('/api/booking',booking);

const orders=require('./controllers/orders');
app.use('/api/listorder',orders);

const cancelorders=require('./controllers/CanceledOrders');
app.use('/api/canceled',cancelorders);

const singleorder=require('./controllers/singleorder');
app.use('/api/myorder',singleorder);

const serviceorder=require('./controllers/serviceorders');
app.use('/api/myorders',serviceorder);

const freeorder=require('./controllers/FreeServiceorder');
app.use('/api/myfreeorders',freeorder);

const singleemp=require('./controllers/singleemp');
app.use('/api/employess',singleemp);

const eemp=require('./controllers/eemp');
app.use('/api/emp',eemp);

const getbooking=require('./controllers/getbooking');
app.use('/api/bookeduser',getbooking);

const getsbooking=require('./controllers/getServiceBooking');
app.use('/api/bookedservice',getsbooking);

const client=require('./controllers/client');
app.use('/api/geography',client);

const over=require('./controllers/stat');
app.use('/api/over',over);

const bill=require('./controllers/bill');
app.use('/api/create-bill',bill);

const servicebill=require('./controllers/servicebill');
app.use('/api/create-servicebill',servicebill);

const sbill=require('./controllers/singlebill');
app.use('/api/generatebill',sbill);

const aservicebill=require('./controllers/singleservicebill');
app.use('/api/billy',aservicebill);

const cancelbooking=require('./controllers/CancelBooking');
app.use('/api/bookingcancel',cancelbooking);

const cancelservicebooking=require('./controllers/CancelServiceBooking');
app.use('/api/sbookingcancel',cancelservicebooking);

const cancelfreeservicebooking=require('./controllers/CancelFreeBooking');
app.use('/api/fbookingcancel',cancelfreeservicebooking);

const worshop=require('./controllers/workshop');
app.use('/api/workshops',worshop);

const viewworkshop=require('./controllers/viewworkshop');
app.use('/api/assist',viewworkshop);

const maintenance=require('./controllers/maintenance');
app.use('/api/mreq',maintenance);

const wear=require('./controllers/wear');
app.use('/api/weared',wear);

const transaction=require('./controllers/TransactionService');
app.use('/api/tran',transaction);

const Wear=require('./controllers/WearOrders');
app.use('/api/orderwear',Wear);

const locations=require('./controllers/locations');
app.use('/api/loki',locations);

const getloc=require('./controllers/getlocation');
app.use('/api/vloki',getloc);

const updateloc=require('./controllers/updateLocation');
app.use('/api/uploki',updateloc);

const serviceemp=require('./controllers/serviceemp');
app.use('/api/serviceemp',serviceemp);
const resolver=require('./controllers/ResolveAssistance');
app.use('/api/resolver',resolver);

const assist=require('./controllers/assistanceRoad');
app.use('/api/assistance-roads',assist);

const getassistanceRoad=require('./controllers/getassistanceRoad');
app.use('/api/empview',getassistanceRoad);

const reviewss=require('./controllers/Reviews');
app.use('/api/rev',reviewss);

const viewreview=require('./controllers/viewReview');
app.use('/api/viewreview',viewreview);

const viewcompleted=require('./controllers/getLocations');
app.use('/api/ViewCompleted',viewcompleted);

const otpverify=require('./controllers/ReviewOtp');
app.use('/api/otpmails',otpverify);

const verifyreview=require('./controllers/getotp');
app.use('/api/verifyotp',verifyreview);

const insurance=require('./controllers/insure');
app.use('/api/insure',insurance);

const validatepolicy=require('./controllers/validatePolicy');
app.use('/api/validatepolicy',validatepolicy);

const approveinsurance=require('./controllers/approveinsurance');
app.use('/api/ainsurance',approveinsurance);

const getinsurance=require('./controllers/getInsurance');
app.use('/api/getinsurance',getinsurance);

const freeservice=require('./controllers/freeservice');
app.use('/api/savefree',freeservice);

const getfreeservice=require('./controllers/getFreeServiceBooking');
app.use('/api/empfree',getfreeservice);

const freeservicedelivery=require('./controllers/ServiceDeliveryStatus');
app.use('/api/stepperstate',freeservicedelivery);

const countbooking=require('./controllers/getFreeServiceDate');
app.use('/api/countbooking',countbooking);

const getfreeservicebyid=require('./controllers/getFreeServiceById');
app.use('/api/freeservicess',getfreeservicebyid);

const getfreeserviceotp=require('./controllers/VerifyDeliveryOtp');
app.use('/api/verifyotp',getfreeserviceotp);

//............user register......//
app.post('/api/register', async (req, res) => {
    try {


      const { username, email, phone, dob, password } = req.body;
      const user = new User({ username, email, phone, dob, designation:"customer" });
      
        const status = await user.save();
        if (status) {

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newLogin = new Login({
                email,
                password: hashedPassword,
                usertype: "user",
                designation:"customer",
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
    const { email, password} = req.body;
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


//-----------------------------------------------------------------------------



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



// GET route for retrieving a list of cars
app.get('/api/GetCars', async (req, res) => {
  try {
    // Retrieve a list of cars from the database
    const cars = await Car.find();

    res.json(cars);
  } catch (error) {
    console.error('Error retrieving cars:', error);
    res.status(500).json({ message: 'Operation Failed' });
  }
});

///add cars
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/cars');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/api/addimage', upload.single('car_img'), async (req, res) => {
  try {
    const { engineNo, model, color } = req.body;

    // Check if required parameters are present
    if (!engineNo || !model || !color) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }

    // Check if an image with the same engineNo and different color already exists
    const existingImage = await Image.findOne({ engineNo, color: { $ne: color } });

    if (existingImage) {
      return res.status(400).json({ message: 'An image with the same engine number but a different color already exists' });
    }

    const filename = req.file ? req.file.path : '';
    const car_img = path.basename(filename);
    const newImage = new Image({ engineNo, model, color, url: car_img });

    const result = await newImage.save();
    if (result) {
      res.status(201).json({ message: 'Image added successfully' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error adding Image:', error);
    res.status(500).json({ message: "Operation Failed" });
  }
});

//////getsinglecar///////////////
app.post('/api/view/:model/:engineNO', async (req, res) => {
  try {
    const modelName = req.params.model;
    const engineNo=req.params.engineNO;

    // Retrieve details for a specific car model from the database
    const carDetails = await Car.findOne({ model: modelName,engineNo:engineNo });

    if (!carDetails) {
      return res.status(404).json({ message: 'Car not found' });
    }

    res.json(carDetails);
  } catch (error) {
    console.error('Error retrieving car details:', error);
    res.status(500).json({ message: 'Operation Failed' });
  }
});
////////////payment//////////////
const razorpayInstance = new razorpay({
  key_id: 'rzp_test_kR8XiPc7MhwMkB',
  key_secret: 'rwOmbt8TyCNzDFLjQ8MK5UUd',
});

app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    console.log("req pay",req);
    const options = {
      amount: amount, // Amount in paisa
      currency: currency,
      receipt: 'receipt_order_74394', // Generate a unique receipt ID for every order
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});
///servicepayment
app.post('/api/create-service', async (req, res) => {
  try {
    const { amount, currency } = req.body;
    console.log("req pay",req);
    const options = {
      amount: amount, // Amount in paisa
      currency: currency,
      receipt: 'receipt_order_74394', // Generate a unique receipt ID for every order
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});
    app.listen(port, ()=> 
    console.log(`server listening on port ${port}!`))
