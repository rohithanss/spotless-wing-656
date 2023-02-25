const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('sql12601054', 'sql12601054', process.env.SQLKEY, {
    host: 'sql12.freesqldatabase.com',
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
