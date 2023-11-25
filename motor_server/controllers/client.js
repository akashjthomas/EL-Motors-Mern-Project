const express = require('express');
const router = express.Router();
const getCountryISO3 = require("country-iso-2-to-3");
const DUsers = require('../model/Users');

router.get('', async (req, res) => {
  try {
    const dusers = await DUsers.find();
   
    const mappedLocations = dusers.reduce((acc, { country }) => {
      const countryISO3 = getCountryISO3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );

    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
module.exports = router;


   