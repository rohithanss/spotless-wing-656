const { DataTypes } = require('sequelize');
const {isEmail,isMobilePhone} = require('validator');

const sequelize = require('../config/db');

const users = sequelize.define('users', {
    id : {
        type :  DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    role: {
        type: DataTypes.ENUM,
        values: ['user', 'trainer', 'admin'],
        allowNull: false
    },
    phone : {
        type : DataTypes.STRING,
        validate: {
            isMobilePhone: {
                strictMode: true
            }
        },
        allowNull : false,
        unique : true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        validate : {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
})

sequelize.sync()
    .then(() => {
        console.log('Users table created successfully');
    })
    .catch((err) => {
        console.error('Unable to create Users table :',err);
    })

module.exports = users