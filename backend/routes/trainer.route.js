const express = require('express');

const bookings = require('../models/booking.model');

const trainerRouter = express.Router();

trainerRouter.post('/addslot', async (req,res) => {
    const {trainer_id,activity_type,fees,reg_date,six,seven,eight,nine,ten,eleven,twelve,one,two,three,four,five,six_eve,seven_eve,eight_eve} = req.body;

    await bookings.create({ trainer_id, activity_type, fees, reg_date, six, seven, eight, nine, ten, eleven, twelve, one, two, three, four, five, six_eve, seven_eve, eight_eve })
    .then(() => {
        res.status(200).send({'msg' : 'Bookings created successfully'})
    })
    .catch((err) => {
        console.error('Failed to add bookings :', err);
        res.status(400).send({'err' : 'error creating bookings'})
    })
})

module.exports = trainerRouter