const nodemailer = require('nodemailer')
// const SibApiV3Sdk = require('sib-api-v3-sdk');


const sendEmail = async (req, res) => {
    let { userEmail, subject, text } = req.body.emailData
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: userEmail,
        subject: subject,
        html: text,
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