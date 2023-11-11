const express = require("express");
const Car = require('../model/carmodel');
const Category = require('../model/categorymodel');
const router = express.Router();

router.get('', async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    // Find the category by name to get its ID
    const category = await Category.findOne({ name: categoryName });

    if (category) {
      // Find cars with the matching category ID
      const cars = await Car.find({ category: category._id });
      res.json({ cars, message: "Cars filtered by category successfully" });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error filtering cars by category' });
  }
});

module.exports = router;
