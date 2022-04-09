const nodemailer = require('nodemailer');
const mailgun = require("mailgun-js");
const { generateEmail } = require('./temp');


const sendEmail = async (req, res) => {
    let { userEmail, subject, text } = req.body.emailData
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: 'developer.shajib@gmail.com',
          pass: '##sh@jib729##',
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          // pass: 'cxywvuqbbkbkfiwl'
        },
          // host: "smtp.mailtrap.io",
          // port: 2525,
          // auth: {
          //   user: "4dcec8ee488ab5",
          //   pass: "e40dbd2e5777b2"
          // }
      });

      const mailOptions = {
        from: 'developer.shajib@gmail.com',
        to: userEmail,
        subject: subject,
        html: generateEmail(text),
      };

        // call SIB api 
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).json({error:error})
        } else {
            res.status(200).json({message:info})
        }
      });
    } catch (err) {
        res.status(400).json({err:err.message})
    }
}

module.exports = sendEmail