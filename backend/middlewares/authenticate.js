const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];
    console.log(token.split(' ')[1]);

    jwt.verify(token, process.env.PRIVATEKEY, (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(400).send({ 'msg': 'Please Login again' })
        } else {
            const userID = decoded.userID;
            req.body.userID = userID;
            next();
        }
    });
}

module.exports = authenticate;
