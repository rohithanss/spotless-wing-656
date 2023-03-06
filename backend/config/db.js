const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "fitness",
  "fitness",
  process.env.SQLKEY,
  {
    host: "db4free.net",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => {
    console.error("Unable to connect DB :", err);
  });

module.exports = sequelize;
