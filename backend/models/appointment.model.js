const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');

const appointments = sequelize.define('appointments',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    customer_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    trainer_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    fees : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    booked_date : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    slot : {
        type : DataTypes.STRING,
        allowNull : false
    },
    type : {
        type : DataTypes.STRING,
        allowNull :false
    },
    zoom_link : {
        type : DataTypes.STRING,
        defaultValue : 'To be updated',
        allowNull : true
    },
    booking_status : {
        type : DataTypes.ENUM,
        values : ['pending','completed'],
        defaultValue : 'pending',
        allowNull : false
    }
})

sequelize.sync()
    .then(() => {
        console.log('Appointments table created successfully');
    })
    .catch((err) => {
        console.error('Unable to create Appointments table :', err);
    })

module.exports = appointments