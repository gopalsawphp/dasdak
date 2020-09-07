var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "xxxxxxx@gmail.com",
        pass: "xxxx@123"
    }
});
var fromEmail ="mail2gopalphp@gmail.com";
exports.fromEmail = fromEmail
exports.smtpTransport = smtpTransport

