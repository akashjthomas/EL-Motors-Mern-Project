const express = require("express");
const Booking = require('../model/bookingmodel');
const Employee = require('../model/employeemodel');
const router =express.Router();

//add route

router.post('', async (req, res) => {
    try {
      const data = req.body; // Form data from the frontend
      console.log("data ......",data);
      const { bookingDate, paymentId,model,userId, ...bookingData } = data;
      // Create a new booking using the Booking model
      const newBooking = await Booking.create({
        ...bookingData,
        bookingDate: bookingDate,
        paymentId: paymentId,
        model: model,
        userId:userId,
        status: 'booked',
        deliverystatus: 'false'
    });
      // Modify these based on your Employee model
      // Find an available employee with the minimum workload
      const availableEmployee = await Employee.findOne({ status: 'Approved', employee_department: 'sales' }).sort({ workload: 1 });
      const {employee_firstName, employee_email } = availableEmployee;
      if (!availableEmployee) {
        throw new Error('No available employees');
      }
      
      // Increment the employee's workload by 1 (assuming workload increments with each assignment)
      availableEmployee.workload += 1;
      await availableEmployee.save();
  
      // Update the new booking with the assigned employee ID
      newBooking.scheduledEmployee = availableEmployee._id;
     await newBooking.save();
    
      res.status(201).json({newBooking, message: 'booking added successfully',employee_firstName, employee_email}); // Send the created booking details back to the frontend
      console.log(employee_email,employee_firstName);
      const nodemailer = require('nodemailer');
     const BookingDate =newBooking.bookingDate;
const emailUser = "akashthomas411@gmail.com";
const emailPassword = "agno jpbl agns uory";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

const mailOptions = {
  from: emailUser,
  to: userId,
  subject: ' Booking Acknowledgment',
  text: `We have recieved your booking for.,
    Model: ${model}
    Booking Date: ${BookingDate}`
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent:', info.response);
  }
});
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Error creating booking' });
    }
  });
  
 module.exports=router;