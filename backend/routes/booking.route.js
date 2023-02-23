const express = require('express');
const {} = require('sequelize');

const appointments = require('../models/appointment.model');
const authRole = require('../middlewares/authRole');

const bookingRouter = express.Router();

bookingRouter.get('/trainer', authRole(['trainer']) , async (req,res) => {
    const {userID} = req.body;

    await appointments.findAll({
        where : {
            trainer_id : userID
        }
    })
    .then((data) => {
        res.status(200).send({status : 'success', data : data})
    })
    .catch((err) => {
        res.status(400).send({status : 'error', msg : 'error getting trainer bookings'})
    })
})

module.exports = bookingRouter