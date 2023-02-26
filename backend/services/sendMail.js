const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
        type: "OAuth2",
        user: "rhans6125@gmail.com",
        clientId: process.env.OTP_CLIENT_ID,
        clientSecret: process.env.OTP_CLIENT_SECRET,
        refreshToken: process.env.OTP_REFRESH_TOKEN,
    },
});

async function sendMail(email, subject, content) {
    transporter.sendMail(
        {
            from: "rhans6125@gmail.com",
            to: email,
            subject: subject,
            text: content,
        },
        (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        }
    );
}

module.exports = sendMail;
