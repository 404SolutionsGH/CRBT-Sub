import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodeMailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SmtpUserName,
    pass: process.env.SmtpSecret,
  },
});

export const sendAccountConfirmationEmail = async (verfCode: number, username: string, email: string) => {
  console.log("Sending Account confirmation email....");
  const messageObject = {
    subject: ` Welcome to ${process.env.AppName} Verify Your Email`,
    text: `Dear ${username},\nWelcome to ${process.env.AppName}\nWe are excited to have you on board. To complete your registration, please verify your email address using the four-digit code below:\n\nYour Verification Code: ${verfCode}\n\nPlease enter this code on the verification page to activate your account.\nIf you did not create an account with us, please ignore this email or contact our support team for assistance.\n\nThank you for joining  ${process.env.AppName}!\n`,
    to: email,
  };

  await transporter.sendMail(messageObject);
  console.log("Email sent");
};
