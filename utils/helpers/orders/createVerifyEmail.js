const nodemailer = require('nodemailer');
require('dotenv').config();

const { BASE_URL, SMTP_GMAIL_USER, SMTP_GMAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_GMAIL_USER,
    pass: SMTP_GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

const SendEmail = async (orderId, newPerson) => {
  const activationLink = `${BASE_URL}/api/v1/order/activate${orderId}/${newPerson._id}`;
  const mailOptions = {
    from: SMTP_GMAIL_USER,
    to: newPerson.email,
    subject: 'Activate Your Account',
    html: `
        <p>Hello ${newPerson.name},</p>
        <p>Click the following link to activate your account:</p>
        <a href="${activationLink}">${activationLink}</a>
      `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending activation email:', error);
    throw error;
  }
};

module.exports = SendEmail;
