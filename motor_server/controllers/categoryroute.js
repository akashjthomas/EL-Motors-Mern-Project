const express = require("express");
const Category= require('../model/categorymodel');
const slugify = require('slugify');
const router =express.Router();

//add route
router.post('', async (req, res) => {
    try {
        const{name}=req.body
        if(!name){
            res.status(401).json({error:'name is required'})
        }
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(409).json({error:'category already exists'})
        }

        const category = await new Category({ name, slug: slugify(name) }).save();

        res.status(201).json({category ,message: 'category added ' });
       
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Error fetching users' });
    }
});
 module.exports=router;