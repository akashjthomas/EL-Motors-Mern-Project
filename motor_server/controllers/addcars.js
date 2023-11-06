const express = require("express");
const Car= require('../model/carmodel');
const router =express.Router();

router.use(express.json()); 

router.post('', async (req, res) => {

    try {
        const {
            engineNo,
            co,
            model,
            make,
            manufacturingYear,
            category,
            cylinder,
            price,
            fuelSource,
            interiorColor,
            interiorMaterial,
            airbags,
            audioSystem,
            transmission,
            seats,
            size,
            length,
          } = req.body;

          console.log(req.body,"server");
      
          const newCar = new Car({
            engineNo,
            co,
            model,
            make,
            manufacturingYear,
            category,
            cylinder,
            price,
            fuelSource,
            interiorColor,
            interiorMaterial,
            airbags,
            audioSystem,
            transmission,
            seats,
            size,
            length,
          });
          console.log(req.files,"2");
          const result = await newCar.save();
         
          if (result) {
            res.status(201).json({result, message: 'Car added successfully' });
          }
        
        } catch (error) {
        console.log(error);
        res.status(500).send.json({ error: 'Error adding cars' });
        
    }

});

module.exports = router ;