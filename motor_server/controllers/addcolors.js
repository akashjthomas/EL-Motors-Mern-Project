const express = require("express");
const Color= require('../model/colormodel');
const router =express.Router();

//add route
router.post('', async (req, res) => {
    try {
        const{name}=req.body
        if(!name){
            res.status(401).json({error:'name is required'})
        }
        const existingColor = await Color.findOne({name});
        if(existingColor){
            return res.status(409).json({error:'color already exists'})
        }

        const color = await new Color({ name}).save();

        res.status(201).json({color ,message: 'color added ' });
       
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error fetching color' });
    }
});
 module.exports=router;