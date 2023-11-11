const express = require("express");
const Category = require('../model/categorymodel');
const router = express.Router();

router.get('', async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });

        if (category) {
            console.log(category)
            // If a category with the provided slug is found, return its id
            const categoryId = category._id; // Assuming that the category id is stored in the _id field
            console.log(categoryId);

            res.json({ categoryId, message: "Get Single Category Successfully" });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error fetching category' });
    }
});

module.exports = router;
