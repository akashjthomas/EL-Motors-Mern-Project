const express = require("express");
const Insurance=require("../model/insurancemodel");
const router =express.Router();


/////////////////////approve employess//////////
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    console.log(id);
    console.log(status);
    

    try {
        // Update the status of the employee in the database
        const [updatedInsurance] =
            await Promise.all([
                Insurance.findOneAndUpdate({ _id:id }, { status },{ new: true }),
                
            ]);

        if (!updatedInsurance ) {
            return res.status(404).json({ message: 'Failed to Update' });
        }

        return res.json({ updatedInsurance, message: 'insurance Approved..' });
    } catch (error) {
        console.error('Error updating employee status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports=router;