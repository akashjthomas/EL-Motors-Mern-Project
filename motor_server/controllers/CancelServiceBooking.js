const express = require("express");
const Maintenance = require('../model/maintenancemodel');
const router =express.Router();
//cancel
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, email } = req.body;
    console.log(id);
    console.log(status);
    console.log(email);
    try {
        const booking = await Maintenance.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const twoWeeksFromBookingDate = new Date(booking.bookingDate);
        twoWeeksFromBookingDate.setDate(twoWeeksFromBookingDate.getDate() + 14); 
        

        // Get the current date
        const currentDate = new Date();

        // Check if the current date is within the allowed cancellation period
        if (currentDate >twoWeeksFromBookingDate ) {
            return res.json({ message: 'Cancellation not allowed. More than2 weekspast booking date.' });
        }
        // Update the status of the employee in the database
        const [updatedBooking] =
            await Promise.all([
                Maintenance.findOneAndUpdate({ _id:id }, { status }, { new: true }),
            ]);


        if (!updatedBooking ) {
            return res.status(404).json({ message: 'Failed to Update' });
        }

        return res.json({ updatedBooking, message: 'Booking canceled..' });
          
    } catch (error) {
        console.error('Error updating bookingstatus:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports=router;