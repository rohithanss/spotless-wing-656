const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authRole = (roleArr) => {
    return (req,res,next) => {
        const token = req.headers.authorization?.split(' ')[1];

        jwt.verify(token, process.env.PRIVATEKEY, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(400).send({ status : 'error' ,msg: 'Something went wrong, Please Login again' })
            } else {
                const role = decoded.role;
                const userID = decoded.userID;
                req.body.userID = userID;
                
                if(roleArr.includes(role)){
                    next()
                } else{
                    return res.status(401).send({status : 'fail', msg : 'Unauthorised role access'})
                }

            }
        });
    }
}

module.exports = authRole;