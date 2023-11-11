const express = require("express");
const Login =require("../model/loginmodel");
const router =express.Router();
const nodemailer = require("nodemailer");
//terminate

const emailUser = "akashthomas411@gmail.com";
const emailPassword = "agno jpbl agns uory";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});


router.patch('', async (req, res) => {
    const { status, email } = req.body;
    console.log(status);
    console.log(email);
    try {
        // Update the status of the employee in the database
        const [updatedLogin] =
            await Promise.all([
                Login.findOneAndUpdate({ email:email }, { status:status }, { new: true }),
            ]);

        if ( !updatedLogin) {
            return res.status(404).json({ message: 'Failed to Update' });
        }
        const mailOptions = {
            from: emailUser,
            to: email,
            subject: 'Account has been blocked',
            text: `your account has been blocked `
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });
          
        return res.json({ updatedLogin, message: 'user blocked..' });

        
    } catch (error) {
        console.error('Error updating user status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports=router;