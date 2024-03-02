const express = require("express");
const Wear = require('../model/wearmodel');
const Employee = require('../model/employeemodel');
const router = express.Router();
const nodemailer = require('nodemailer'); // Moved nodemailer import to the top

// Add route
router.post('', async (req, res) => {
    try {
        // Validate request body
        const { bookingDate, userId, selectedService, paymentId, vin, Models, selectedOptions, pickupAddress, pincode,selectedDate } = req.body;
        console.log('userId', userId);
        console.log('selectedService', selectedService);
        console.log(selectedOptions);
        console.log(vin);
        console.log(selectedDate);
        console.log('mwear', req.body);
        if (!userId || !selectedService || !vin || !Models || !selectedOptions || !pickupAddress || !pincode  || !selectedDate || selectedOptions.length === 0) {
            return res.status(400).json({ error: 'All fields are required and selectedOptions cannot be empty' });
        }

        const existingMaintenance = await Wear.findOne({ vin, bookingDate });
        if (existingMaintenance) {
            return res.status(400).json({ error: 'Service for this VIN on the selected date already exists' });
        }
        
        // Save maintenance data
        const newWear = await new Wear({
            bookingDate: bookingDate,
            userId,
            selectedService,
            paymentId: paymentId,
            vin,
            Models,
            pickupAddress,
            pincode,
            selectedOptions,
            status: 'booked',
            pickupstatus: 'false',
            selectedDate
        }).save();
        console.log('maintenance saved', newWear);

        const availableEmployee = await Employee.findOne({ status: 'Approved', employee_department: 'service' }).sort({ workload: 1 });
        if (!availableEmployee) {
            throw new Error('No available employees');
        }

        // Increment the employee's workload by 1 (assuming workload increments with each assignment)
        availableEmployee.workload += 1;
        await availableEmployee.save();

        // Update the new booking with the assigned employee ID
        newWear.scheduledEmployee = availableEmployee._id;
        await newWear.save();

        // Send email notification
        const BookingDate = newWear.bookingDate;
        const emailUser = "akashthomas411@gmail.com";
        const emailPassword = "agno jpbl agns uory";
        const Vin=newWear.vin;
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
            subject: 'Service Booking Acknowledgment',
            text: `We have received your service booking for.,
      Model: ${Models}
      Booking Date: ${BookingDate}
      service date:${selectedDate}
      VIN:${vin}`
      
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // Send the created booking details back to the frontend
        res.status(201).json({ newWear, message: 'Booking added successfully', employee_firstName: availableEmployee.employee_firstName, employee_email: availableEmployee.employee_email });
        console.log(availableEmployee.employee_email, availableEmployee.employee_firstName);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add service request maintenance data' });
    }
});

module.exports = router;
