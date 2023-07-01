const nodemailer = require("nodemailer");
const { generateEmail } = require('./temp');

const sendEmail = async (data) => {
  let { email, subject, OTP } = data
  // console.log(data);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });
    const mailOptions = {
      from: `Exm Account Verification <${process.env.USER_EMAIL}>`,
      to: email,
      subject: subject || "Verify Your Account",
      html: generateEmail(OTP),
    };
    await transporter.sendMail(mailOptions);
    console.log({message: "Send Email Successfully"});
    return { message: "A mail has been send to user" }
  } catch (err) {
    console.log({ error: err.message });
    return { error: err.message }
  }
};

module.exports = sendEmail