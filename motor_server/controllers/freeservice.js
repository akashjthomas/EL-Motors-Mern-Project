const express = require("express");
const FreeService = require('../model/freeservicemodel');
const Employee = require('../model/employeemodel');
const router = express.Router();
const nodemailer = require('nodemailer'); // Moved nodemailer import to the top

// Add route
router.post('', async (req, res) => {
    try {
        
        // Validate request body
        const { userid,policytype, policyexp,policyno , model, regno,  servicetype, date,paymentId,amount} = req.body;
    
        console.log('free service', req.body);
        
 // Count the number of existing bookings for the selected date
 
 const formattedDate = new Date(date).toISOString().split('T')[0]; // Assuming date is in the correct format

const bookingsCount = await FreeService.countDocuments({ selectedDate: formattedDate });
if (bookingsCount >= 6) {
    return res.status(400).json({ error: 'Maximum bookings reached for this date' });
}


 const existingFreeService = await FreeService.findOne({ regno, selectedDate });
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
      paymentId: paymentId, // Assuming paymentId is provided in the request body
      amount:amount,
      status: 'booked'
        }).save();
        console.log('free service saved', newFreeService);

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
        const selectedDate = newFreeService.selectedDate;
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
            to: userid,
            subject: 'Service Booking Acknowledgment',
            text: `We have received your service booking for.,
      Model: ${model}
      Booking Date: ${selectedDate}
      VIN:${regno}`
      
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // Send the created booking details back to the frontend
        res.status(201).json({ newFreeService, message: 'Booking added successfully', employee_firstName: availableEmployee.employee_firstName, employee_email: availableEmployee.employee_email });
        console.log(availableEmployee.employee_email, availableEmployee.employee_firstName);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add service request maintenance data' });
    }
});

module.exports = router;
