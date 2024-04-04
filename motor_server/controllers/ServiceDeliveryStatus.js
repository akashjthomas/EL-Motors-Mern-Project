const express = require("express");
const FreeService = require('../model/freeservicemodel');
const router = express.Router();

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Assuming you're passing status in the request body

        console.log(id, "id");
        console.log(status);

        // Use findOneAndUpdate to update the document
        const category = await FreeService.findOneAndUpdate(
            { _id: id }, // Filter criteria
            { status: status }, // Update operation
            { new: true } // Return the updated document
        );

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.status(200).send({
            category,
            success: true,
            message: "Updated Successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating category' });
    }
});

module.exports = router;
