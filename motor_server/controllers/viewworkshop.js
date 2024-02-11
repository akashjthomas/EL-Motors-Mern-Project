const express = require("express");
const Workshop = require("../model/workshopmodel");
const router =express.Router();

//-----------------------displayuser------------------------------------------------

router.get('', async (req, res) => {
    try {
        const workshops = await Workshop.find();
        res.json(workshops);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching workshops' });
    }
});
 module.exports=router;