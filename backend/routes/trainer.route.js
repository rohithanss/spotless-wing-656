const express = require('express');
const {Op} = require('sequelize');

const bookings = require('../models/booking.model');

const trainerRouter = express.Router();

trainerRouter.post('/addslot', async (req,res) => {
    const {userID,activity_type,fees,reg_date,slots} = req.body;

    await bookings.create({ trainer_id : userID, activity_type, fees, reg_date, ...slots })
    .then(() => {
        // console.log(x);
        res.status(200).send({status : 'success' ,msg : 'Bookings created successfully'})
    })
    .catch((err) => {
        console.error('Failed to add bookings :', err);
        res.status(400).send({status : 'error',msg : 'error creating bookings'})
    })
})

trainerRouter.get('/avilableslots', async (req,res) => {
    const trainer_id = req.body.userID;
    const date = new Date();
    const curr_date = date.toISOString().split('T')[0]

    await bookings.findAll({ where: {
        trainer_id,
        [Op.or]: [{ six: 1 }, { seven: 1 }, { eight: 1 }, { nine: 1 }, { ten: 1 }, { eleven: 1 }, { twelve: 1 }, { one: 1 }, { two: 1 }, { three: 1 }, { four: 1 }, { five: 1 }, { six_eve: 1 }, { seven_eve: 1 }, { eight_eve: 1 }],
        reg_date: {
            [Op.gte]: curr_date,
        }
    } })
    .then((slots) => {
        // console.log('slots :',slots);
        res.status(200).send({status: 'success', data : slots})
    })
    .catch((err) => {
        res.send(err)
    })

})

trainerRouter.patch('/updateslot', async (req,res) => {
    const { id, slots } = req.body;
    const date = new Date();
    const curr_date =  date.toISOString().split('T')[0]
    // console.log('date:',curr_date);

    await bookings.findByPk(id)
    .then(async (data) => {
        if(data.reg_date >= curr_date){
            // res.send(data)
            await bookings.update({ ...slots },
                {
                    where: {
                        id,
                        reg_date: {
                            [Op.gte]: curr_date,
                        }
                    }
                }
            )
                .then((data) => {
                    res.status(200).send({status : 'success', msg : 'Slot updated successfully'});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).send({status : 'error', msg : 'error updating slot'})
                })   
        } else {
            return res.send({status : 'fail', msg : 'Cannot update previous time slots'})
        }
    })
    .catch((err) => {
        res.status(200).send({status : 'error', msg : 'error finding slot to update'})
    })

});

module.exports = trainerRouter