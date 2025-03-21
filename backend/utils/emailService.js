const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendConfirmationEmail = async (to, studentName, eventName) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "Event Registration Confirmation",
        html: `
            <h3>Hello ${studentName},</h3>
            <p>You have successfully registered for <strong>${eventName}</strong>.</p>
            <p>We look forward to seeing you at the event!</p>
            <p>Best Regards,<br>Sports Fest Team</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent to:", to);
    } catch (error) {
        console.error("Email Error:", error);
    }
};

module.exports = { sendConfirmationEmail };
