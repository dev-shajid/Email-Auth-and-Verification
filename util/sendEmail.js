const nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
const { generateEmail } = require('./temp');

const sendEmail = async (req, res) => {
    let { userEmail, subject, text } = req.body.emailData
    try {
      const transporter = nodemailer.createTransport(smtpTransport({
        service: "gmail",
        // smtp:'smtp.gmail.com',
        // port:465,
        // secure:true,
        auth: {
          user: process.env.USER_EMAIL,
          pass: "##sh@jib729##",
        },
      }));

      const mailOptions = {
        from: process.env.USER_EMAIL,
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