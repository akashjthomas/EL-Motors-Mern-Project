const express = require("express");
const User = require("../model/usermodel");
const router =express.Router();

//-----------------------displayuser------------------------------------------------

router.get('', async (req, res) => {
    try {
        const users = await User.find({ designation:'customer'});
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});
 module.exports=router;