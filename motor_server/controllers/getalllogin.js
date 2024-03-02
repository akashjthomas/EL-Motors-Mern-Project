const express = require("express");
const Login = require("../model/loginmodel");
const router =express.Router();

//-----------------------displayuser------------------------------------------------

router.get('', async (req, res) => {
    try {
        const users = await Login.find({designation:"customer"});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});
 module.exports=router;