const express = require("express");
const BillForm= require('../model/billform');
const router =express.Router();

router.use(express.json()); 

router.post('', async (req, res) => {

    try {
        const {
            OilChange,           	
            BrakeInspection,
            TireRotation,	
            EngineTuneup,	
            FluidTopup,	
            AirFilterReplacement,	
            Other,	
             Labor,	
             Parts,	
             Tax	,
             Total,	

          } = req.body;

          console.log(req.body,"server");
      
          const newBillform = new BillForm({
            OilChange,           	
            BrakeInspection,
            TireRotation,	
            EngineTuneup,	
            FluidTopup,	
            AirFilterReplacement,	
            Other,	
             Labor,	
             Parts,	
             Tax	,
             Total,	
          });
          console.log(req.files,"2");
          const result = await newBillform.save();
         
          if (result) {
            res.status(201).json({result, message: 'BillForm added successfully' });
          }
        
        } catch (error) {
        console.log(error);
        res.status(500).send.json({ error: 'Error adding cars' });
        
    }

});

module.exports = router ;

	
