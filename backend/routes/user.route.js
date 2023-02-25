const express = require("express");
const { Op } = require("sequelize");

const bookings = require('../models/booking.model');
const users = require('../models/user.model');

users.hasMany(bookings,{foreignKey : 'trainer_id',as:'trainerData'})
bookings.belongsTo(users, { foreignKey: 'trainer_id', as: 'trainerData' })


const userRouter = express.Router();

userRouter.get('/availableslots', async (req,res) => {
    const date = new Date();
    const curr_date = date.toISOString().split("T")[0];
    const q = req.query;
    const queDate = q?.selected_date;
    var activity_type = q?.type;
    activity_type = activity_type.split(",");

    console.log(activity_type);

    if(queDate === 'nodate'){
        await bookings.findAll({
            where : {
                reg_date : {
                    [Op.gte] : curr_date
                },
                activity_type : {
                    [Op.or] : activity_type
                },
                [Op.or] : [
                    { six: 1 },
                    { seven: 1 },
                    { eight: 1 },
                    { nine: 1 },
                    { ten: 1 },
                    { eleven: 1 },
                    { twelve: 1 },
                    { one: 1 },
                    { two: 1 },
                    { three: 1 },
                    { four: 1 },
                    { five: 1 },
                    { six_eve: 1 },
                    { seven_eve: 1 },
                    { eight_eve: 1 },
                ],
                include: [{
                    model: users,
                    as: 'trainerData',
                    attributes: ['name', 'email', 'phone']
                }]
            }
        })
        .then((slots) => {
            res.status(200).send({status : 'success', data : slots});
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({status : 'error', msg : 'error finding available slots for user'})
        })
    } else {
        await bookings.findAll({
            where: {
                reg_date: queDate,
                activity_type: {
                    [Op.or]: activity_type
                },
                [Op.or]: [
                    { six: 1 },
                    { seven: 1 },
                    { eight: 1 },
                    { nine: 1 },
                    { ten: 1 },
                    { eleven: 1 },
                    { twelve: 1 },
                    { one: 1 },
                    { two: 1 },
                    { three: 1 },
                    { four: 1 },
                    { five: 1 },
                    { six_eve: 1 },
                    { seven_eve: 1 },
                    { eight_eve: 1 },
                ]
            },
            include : [{
                model : users,
                as : 'trainerData',
                attributes : ['name','email','phone']
            }]
        })
            .then((slots) => {
                res.status(200).send({ status: 'success', data: slots });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({ status: 'error', msg: 'error finding selected date"s available slots for user' })
            })
    }
})

module.exports = userRouter