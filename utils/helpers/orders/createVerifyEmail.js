const nodemailer = require("nodemailer");
require("dotenv").config();

const { urls } = require("../../../config/app");

const { SMTP_GMAIL_USER, SMTP_GMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SMTP_GMAIL_USER,
        pass: SMTP_GMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
    },
});

const SendEmail = async (orderId, newPerson) => {
    const activationLink = `${urls.APP_URL}/api/v1/order/activate/${orderId}/${newPerson._id}`;
    const mailOptions = {
        from: SMTP_GMAIL_USER,
        to: newPerson.email,
        subject: "Активація аккаунту",
        html: `
        <p>Вітаємо ${newPerson.name},</p>
        <p>Перейдіть за посиланням для підтвердження реєстрації на допомогу :</p>
        <a href="${activationLink}">${activationLink}</a>
      `,
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending activation email:", error);
        throw error;
    }
};

module.exports = SendEmail;
