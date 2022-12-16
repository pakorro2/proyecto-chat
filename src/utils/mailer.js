const nodemailer = require('nodemailer');
const config = require('../../config');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: config.api.email,
    pass: config.api.emailPass
  }
})

module.exports = transporter