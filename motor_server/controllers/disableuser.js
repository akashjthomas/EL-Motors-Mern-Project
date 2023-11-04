const express=require('express');
const User=require('../model/loginmodel');
const router =express.Router();

router.patch('', async (req, res) => {
    const { id } = req.params;
    const { status, email } = req.body;
    console.log(id);
    console.log(status);
    console.log(email);

});