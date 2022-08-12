const nodemailer = require("nodemailer");
const { generateEmail } = require('./temp');

const sendEmail = async (req, res) => {
  let { userEmail, subject, text } = req.body.emailData
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    const mailOptions = {
      from: `"Shajid's Auth" <${process.env.USER_EMAIL}>`,
      to: userEmail,
      subject: subject,
      html: generateEmail(text),
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({message:"A mail has been send to user"})
    console.log("Send Email Successfully");
  } catch (err) {
    console.log(err.message);
    res.status(400).json({error:err.message})
  }
};

module.exports = sendEmail