const express = require("express");
const { Op } = require("sequelize");
const omit = require("lodash.omit");

const appointments = require("../models/appointment.model");
const bookings = require("../models/booking.model");
const authRole = require("../middlewares/authRole");

const bookingRouter = express.Router();

bookingRouter.get("/trainer", authRole(["trainer"]), async (req, res) => {
  const { userID } = req.body;
  const date = new Date();
  const curr_date = date.toISOString().split("T")[0];
  const q = req.query;
  const queDate = q?.selected_date;
  var activity_type = q?.type;
  activity_type = activity_type.split(",");

  if (queDate === "nodate") {
    await appointments
      .findAll({
        where: {
          trainer_id: userID,
          type: {
            [Op.or]: activity_type,
          },
          booked_date: {
            [Op.gte]: curr_date,
          },
        },
      })
      .then((data) => {
        res.status(200).send({ status: "success", data: data });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .send({ status: "error", msg: "error getting trainer bookings" });
      });
  } else {
    await appointments
      .findAll({
        where: {
          trainer_id: userID,
          type: {
            [Op.or]: activity_type,
          },
          booked_date: queDate,
        },
      })
      .then((data) => {
        res.status(200).send({ status: "success", data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          status: "error",
          msg: "error getting trainer bookings for selected date",
        });
      });
  }
});

// See booked Slots
bookingRouter.get("/user", authRole(["user"]), async (req, res) => {
  const { userID } = req.body;
  const date = new Date();
  const curr_date = date.toISOString().split("T")[0];
  const q = req.query;
  const queDate = q?.selected_date;
  var activity_type = q?.type;
  activity_type = activity_type.split(",");

  if (queDate === "nodate") {
    await appointments
      .findAll({
        where: {
          customer_id: userID,
          type: {
            [Op.or]: activity_type,
          },
          booked_date: {
            [Op.gte]: curr_date,
          },
        },
      })
      .then((data) => {
        res.status(200).send({ status: "success", data: data });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .send({ status: "error", msg: "error getting user bookings" });
      });
  } else {
    await appointments
      .findAll({
        where: {
          customer_id: userID,
          type: {
            [Op.or]: activity_type,
          },
          booked_date: queDate,
        },
      })
      .then((data) => {
        res.status(200).send({ status: "success", data: data });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          status: "error",
          msg: "error getting user bookings for selected date",
        });
      });
  }
});

// Book Slots
bookingRouter.post("/bookslot", authRole(["user"]), async (req, res) => {
  const { userID, trainer_id, booked_date, slot, type } = req.body;
  
  

  await bookings
    .update(slot, {
      where: {
        reg_date: booked_date,
        trainer_id,
      },
    })
    .then((data) => {
      console.log("booking reserved");
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ status: "error", msg: "error reserving booking" });
    });

  await appointments
    .create({
      customer_id: userID,
      trainer_id,
      booked_date,
      slot: Object.keys(slot)[0],
      type,
    })
    .then((data) => {
      console.log(data);
      res
        .status(200)
        .send({ status: "success", msg: "appointment booked successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(400)
        .send({ status: "error", msg: "error booking appointment" });
    });
});

module.exports = bookingRouter;
