const express = require('express');
const {Op} = require('sequelize');
const omit = require('lodash.omit');

const appointments = require('../models/appointment.model');
const authRole = require('../middlewares/authRole');

const bookingRouter = express.Router();

bookingRouter.get('/trainer', authRole(['trainer']) , async (req,res) => {
    const {userID} = req.body;
    const date = new Date();
    const curr_date = date.toISOString().split('T')[0];
    const q = req.query;
    const queDate = q?.selected_date;

    if(queDate === 'nodate'){
        await appointments.findAll({
            where: {
                trainer_id: userID,
                booked_date: {
                    [Op.gte] : curr_date
                }
            }
        })
            .then((data) => {
                res.status(200).send({ status: 'success', data: data })
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({ status: 'error', msg: 'error getting trainer bookings' })
            })
    } else{
        await appointments.findAll({
            where: {
                trainer_id: userID,
                booked_date : queDate
            }
        })
            .then((data) => {
                res.status(200).send({ status: 'success', data: data })
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({ status: 'error', msg: 'error getting trainer bookings for selected date' })
            })
    }

})

module.exports = bookingRouter