const nodeMailer = require("nodemailer");
const {smtpPort,smtpUser,smtpPass, adminEmail} =require("../config/config")

const sendMail = async(userMessage)=>{
    const transporter = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: smtpPort,
        auth: {
             user: smtpUser,
             pass: smtpPass
            }
    });

    await transporter.sendMail({
        subject: "contact request from web-x-pro",
        to: adminEmail,
        from: userMessage.email,
        text: userMessage
    })
}

module.exports= sendMail;