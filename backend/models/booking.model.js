const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');

const bookings = sequelize.define('bookings', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    trainer_id : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    activity_type : {
        type : DataTypes.STRING,
        allowNull : false
    },
    fees : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    reg_date : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    six : {
        type : DataTypes.BOOLEAN,
        defaultValue : 0,
        allowNull : false
    },
    seven : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    eight : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    nine : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    ten : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    eleven : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    twelve : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    one : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    two : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    three : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    four : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    five : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    six_eve : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    seven_eve : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
    eight_eve : {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false
    },
})

sequelize.sync()
    .then(() => {
        console.log('Bookings table created successfully');
    })
    .catch((err) => {
        console.error('Unable to create Bookings table :', err);
    })

module.exports = bookings