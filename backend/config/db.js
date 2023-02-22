const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('fitness', 'root', process.env.SQLKEY, {
    host : 'localhost',
    dialect : 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to DB Successfully');
    })
    .catch((err) => {
        console.error('Unable to connect DB :',err);
    })

    module.exports = sequelize
