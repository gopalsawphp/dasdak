const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY
};