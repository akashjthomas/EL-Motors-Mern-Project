const express = require("express");
const Insurance=require("../model/insurancemodel");
const router =express.Router();


/////////////////////approve employess//////////
router.patch('', async (req, res) => {
    const { regno } = req.params;
    const { status, email } = req.body;
    console.log(regno);
    console.log(status);
    console.log(email);

    try {
        // Update the status of the employee in the database
        const [updatedInsurance] =
            await Promise.all([
                Insurance.findOneAndUpdate({ regno: email }, { status },{ new: true }),
                
            ]);

        if (!updatedInsurance ) {
            return res.status(404).json({ message: 'Failed to Update' });
        }

        return res.json({ updatedInsurance, message: 'employee Approved..' });
    } catch (error) {
        console.error('Error updating employee status:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports=router;