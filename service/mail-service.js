const nodemailer = require('nodemailer');
require('dotenv').config();

const gmailParams = {
  service: "gmail",
  auth: {
    user: process.env.SMTP_GMAIL_USER,
    pass: process.env.SMTP_GMAIL_PASSWORD
  }
}

class MailService {

  constructor() {
    try {
      this.transporter = nodemailer.createTransport(gmailParams);
      this.transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("SMTP сервер готовий до відправки повідомлень...");
        }
      });
    } catch (err) {
      console.log("Помилка в роботі SMTP серверу");
    }
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({   
      from: process.env.SMTP_USER,
      to,
      subject: `Відновлення доступу до сайту`,
      text: '',
      html: 
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title></title>
            <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700" rel="stylesheet">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background: #f1f1f1;
                    font-family: 'Lato', sans-serif;
                    font-weight: 400;
                    font-size: 15px;
                    line-height: 1.8;
                    color: rgba(0, 0, 0, .5);
                    height: 100%;
                    width: 100%;
                    text-align: center;
                }
        
                table {
                    border-spacing: 0;
                    border-collapse: collapse;
                    table-layout: fixed;
                    margin: 0 auto;
                }
        
                a {
                    text-decoration: none;
                    color: #a84242;
                }
        
                .bg_white {
                    background: #ffffff;
                }
        
                .btn {
                    padding: 5px 20px;
                    display: inline-block;
                    border-radius: 0;
                    background: #000;
                    color: #fff;
                }
        
                h1, h2, h3, h4, h5, h6 {
                    font-family: 'Playfair Display', sans-serif;
                    color: #1F252B;
                    margin-top: 0;
                    font-weight: 400;
                }

                h1 a {
                  color: #1F252B
                }
        
                .logo h1 {
                    margin: 0;
                    font-size: 30px;
                    font-weight: 700;
                    font-family: 'Playfair Display', sans-serif;
                    font-style: italic;
                    color: #1F252B;
                }
        
                .intro {
                    position: relative;
                    z-index: 0;
                    padding: 2em 0 4em 0;
                    text-align: center;
                }
        
                .intro .text h2 {
                    font-size: 24px;
                    margin-bottom: 0;
                    font-weight: 300;
                    color: #000;
                }
        
                @media screen and (max-width: 500px) {
                    /* Add responsive styles here */
                }
            </style>
        </head>
        <body style="margin: 0; mso-line-height-rule: exactly; background-color: #222222;">
            <center style="width: 100%; background-color: #f1f1f1;">
                <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                        <tr>
                            <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td class="logo" style="text-align: center;">
                                            <h1><a href="http://450kr.com/">Громадська організація «4.5.0. Кривий Ріг»</a></h1>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td valign="middle" class="intro bg_white">
                                <table>
                                    <tr>
                                        <td>
                                            <div class="text" style="text-align: center;">
                                                <h2>Відновлення доступу до сайту</h2>
                                                <p>Якщо ви забули пароль Ви можете його змінити <br> перейшовши за посиланнями нижче.</p> 
                                                <p> У разі якщо Ви не замовляли дану послугу, можливо хтось намагається отримати доступ до Вашого сайту.</p>
                                                <p><a href="${link}" class="btn">Відновити пароль</a></p>
                                                <p><a href="${link}">Для відновлення паролю перейдіть за посиланням</a></p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </body>
        </html>
        `
    }, (err, info) => {
      console.log("Помилка при відправленні повідомлення");
    })
  }
}

module.exports = new MailService();