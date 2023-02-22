const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const users = require("../models/user.model");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { name, role, email, phone, password } = req.body;
  // console.log(name, role, email, phone, password);
  // const role = req.headers('role');

  bcrypt.hash(password, 4, async (err, hash) => {
    if (err) {
      console.log(err);
      res.status(400).send({ err: "Something went wrong, try again later" });
    } else {
      await users
        .create({ name, role, phone, email, password: hash })
        .then(() => {
          res.status(200).send({ msg: "User Created successfully" });
        })
        .catch((err) => {
          console.error("Failed to signup :", err);
          res.status(400).send({ err: "error creating user" });
        });
    }
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ where: { email } });

  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send({ err: "Something went wrong 1" });
      }

      if (result == true) {
        jwt.sign(
          { userID: user.id, role: user.role },
          process.env.PRIVATEKEY,
          (err, token) => {
            if (err) {
              res
                .status(400)
                .send({ err: "Something went wrong, Please login again" });
            } else {
              res.status(202).send({ msg: "Login Successful", token: token });
            }
          }
        );
      } else {
        res.status(401).send({ msg: "Wrong Credentials, try again" });
      }
    });
  } else {
    res.status(404).send({ msg: "User not found, Please signup" });
  }
});

module.exports = authRouter;
