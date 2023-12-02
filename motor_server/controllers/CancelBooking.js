const express = require("express");
const Booking=require("../model/bookingmodel");
const router =express.Router();
//cancel
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, email } = req.body;
    console.log(id);
    console.log(status);
    console.log(email);
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Calculate the date 3 months from the booking date
        const threeMonthsFromBookingDate = new Date(booking.bookingDate);
        threeMonthsFromBookingDate.setMonth(threeMonthsFromBookingDate.getMonth() + 3);

        // Get the current date
        const currentDate = new Date();

        // Check if the current date is within the allowed cancellation period
        if (currentDate > threeMonthsFromBookingDate) {
            return res.json({ message: 'Cancellation not allowed. More than 3 months past booking date.' });
        }
        // Update the status of the employee in the database
        const [updatedBooking] =
            await Promise.all([
                Booking.findOneAndUpdate({ _id:id }, { status }, { new: true }),
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