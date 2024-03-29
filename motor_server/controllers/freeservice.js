const express = require("express");
const FreeService = require('../model/freeservicemodel');
const Employee = require('../model/employeemodel');
const router = express.Router();
// const nodemailer = require('nodemailer'); // Moved nodemailer import to the top

// Add route
router.post('', async (req, res) => {
    try {
        
        // Validate request body
        const { userid,policytype, policyexp,policyno , model, regno,  servicetype, date } = req.body;
    
        console.log('maintanence', req.body);
        // if (!userId || !selectedService || !vin || !Models || !selectedOptions || !pickupAddress || !pincode || !selectedDate || selectedOptions.length === 0) {
        //     return res.status(400).json({ error: 'All fields are required and selectedOptions cannot be empty' });
        // }

        const existingFreeService = await FreeService.findOne({ regno, date });
        if (existingFreeService) {
            return res.status(400).json({ error: 'Service for this VIN on the selected date already exists' });
        }
        
        // Save maintenance data
        const newFreeService = await new FreeService({
            userId: userid,
      policyType: policytype,
      policyExpiryDate: policyexp,
      policyNo: policyno,
      model: model,
      serviceType: servicetype,
      regno: regno,
      selectedDate: date,
      paymentId: 'iiii', // Assuming paymentId is provided in the request body
      status: 'booked'
        }).save();
        console.log('maintenance saved', newFreeService);

        const availableEmployee = await Employee.findOne({ status: 'Approved', employee_department: 'service' }).sort({ workload: 1 });
        if (!availableEmployee) {
            throw new Error('No available employees');
        }

        // Increment the employee's workload by 1 (assuming workload increments with each assignment)
        availableEmployee.workload += 1;
        await availableEmployee.save();

        // Update the new booking with the assigned employee ID
        newFreeService.scheduledEmployee = availableEmployee._id;
        await newFreeService.save();

    //     // Send email notification
    //     const BookingDate = newFreeService.bookingDate;
    //     const emailUser = "akashthomas411@gmail.com";
    //     const emailPassword = "agno jpbl agns uory";
    //     const Vin=newFreeService.vin;
    //     const transporter = nodemailer.createTransport({
    //         service: "Gmail",
    //         auth: {
    //             user: emailUser,
    //             pass: emailPassword,
    //         },
    //     });

    //     const mailOptions = {
    //         from: emailUser,
    //         to: userId,
    //         subject: 'Service Booking Acknowledgment',
    //         text: `We have received your service booking for.,
    //   Model: ${Models}
    //   Booking Date: ${selectedDate}
    //   VIN:${vin}`
      
    //     };

    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             console.error('Error sending email:', error);
    //         } else {
    //             console.log('Email sent:', info.response);
    //         }
    //     });

        // Send the created booking details back to the frontend
        res.status(201).json({ newFreeService, message: 'Booking added successfully', employee_firstName: availableEmployee.employee_firstName, employee_email: availableEmployee.employee_email });
        console.log(availableEmployee.employee_email, availableEmployee.employee_firstName);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add service request maintenance data' });
    }
});

module.exports = router;
