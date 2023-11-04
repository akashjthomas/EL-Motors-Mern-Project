const express = require("express");
const Category = require('../model/categorymodel');
const router = express.Router();
const slugify = require('slugify'); 

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        console.log(id, "id");
        console.log(name);

        // You should use findOneAndUpdate like this
        const category = await Category.findOneAndUpdate(
            { _id: id }, // Use an object to specify the filter
            { name, slug: slugify(name) },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).send({
            category,
            success: true,
            message: "Category Updated Successfully", // Corrected typo
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: 'Error updating category' });
    }
});

module.exports = router;
