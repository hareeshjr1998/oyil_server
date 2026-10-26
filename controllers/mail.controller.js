
require('dotenv').config(); // Ensure environment variables are loaded first
const nodemailer = require('nodemailer');

class Mail {
    constructor() {
        this.transporter = this.createTransporter();
    }

    createTransporter() {
        return nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true, // Use SSL (true for port 465)
            auth: {
                user: process.env.SERVICE_MAIL,
                pass: process.env.MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Allow self-signed certificates
            },
        });
    }

    async send(mailOptions) {
        try {
            const info = await this.transporter.sendMail(mailOptions);
            //console.log('Email sent successfully:', info.response);
        } catch (error) {
            //console.error('Error sending email:', error);
            throw error; // Propagate the error for further handling
        }
    }
}

module.exports = Mail;