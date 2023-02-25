const express = require("express");
const { Op } = require("sequelize");
const authRole = require("../middlewares/authRole");
const appointments = require("../models/appointment.model");

const bookings = require("../models/booking.model");

const trainerRouter = express.Router();

trainerRouter.post("/addslot", async (req, res) => {
  const { userID, activity_type, fees, reg_date, slots } = req.body;

  await bookings
    .create({ trainer_id: userID, activity_type, fees, reg_date, ...slots })
    .then(() => {
      // console.log(x);
      res
        .status(200)
        .send({ status: "success", msg: "Bookings created successfully" });
    })
    .catch((err) => {
      console.error("Failed to add bookings :", err);
      res.status(400).send({ status: "error", msg: "error creating bookings" });
    });
});

trainerRouter.get("/availableslots", async (req, res) => {
  const trainer_id = req.body.userID;
  const date = new Date();
  const curr_date = date.toISOString().split("T")[0];
  const q = req.query;
  const queDate = q?.selected_date;
  var activity_type = q?.type;
  activity_type = activity_type.split(",");

  if (queDate === "nodate") {
    // console.log('empty str cond');
    await bookings
      .findAll({
        where: {
          trainer_id,
          reg_date: {
            [Op.gte]: curr_date,
          },
          activity_type: {
            [Op.or]: activity_type,
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
          ],
        },
      })
      .then((slots) => {
        // console.log('slots :',slots);
        res.status(200).send({ status: "success", data: slots });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .send({ status: "error", msg: "error finding all slots" });
      });
  } else {
    await bookings
      .findAll({
        where: {
          trainer_id,
          reg_date: queDate,
          activity_type: {
            [Op.or]: activity_type,
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
          ],
        },
      })
      .then((slots) => {
        // console.log('slots :',slots);
        res.status(200).send({ status: "success", data: slots });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          status: "error",
          msg: 'error finding selected date"s slots',
        });
      });
  }
});

trainerRouter.patch("/updateslot", async (req, res) => {
  const { id, slots } = req.body;
  const date = new Date();
  const curr_date = date.toISOString().split("T")[0];
  // console.log('date:',curr_date);

  await bookings
    .findByPk(id)
    .then(async (data) => {
      if (data.reg_date >= curr_date) {
        // res.send(data)
        await bookings
          .update(
            { ...slots },
            {
              where: {
                id,
                reg_date: {
                  [Op.gte]: curr_date,
                },
              },
            }
          )
          .then((data) => {
            res
              .status(200)
              .send({ status: "success", msg: "Slot updated successfully" });
          })
          .catch((err) => {
            console.log(err);
            res
              .status(400)
              .send({ status: "error", msg: "error updating slot" });
          });
      } else {
        return res.send({
          status: "fail",
          msg: "Cannot update previous time slots",
        });
      }
    })
    .catch((err) => {
      res
        .status(200)
        .send({ status: "error", msg: "error finding slot to update" });
    });
});

trainerRouter.delete("/closeslot/:id", async (req, res) => {
  const { id } = req.params;

  await bookings
    .destroy({
      where: {
        id,
      },
    })
    .then(() => {
      res
        .status(200)
        .send({ status: "success", msg: "Slots deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({ status: "error", msg: "error deleting slots" });
    });
});

trainerRouter.patch(
  "/updateslotdetails",
  authRole(["trainer"]),
  async (req, res) => {
    const { id, zoom_link, booking_status, userID } = req.body;

    await appointments
      .update(
        {
          zoom_link,
          booking_status,
        },
        {
          where: {
            id,
            trainer_id: userID,
          },
        }
      )
      .then(() => {
        res.status(200).send({
          status: "success",
          msg: "zoom link and booking status updated successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          status: "error",
          msg: "error updating zoom link and booking status",
        });
      });
  }
);

module.exports = trainerRouter;
