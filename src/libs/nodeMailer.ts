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

export const sendAccountResetEmail = async (username:string,newPassword:string,email:string) => {
 const messageObject = {
   subject: `${process.env.AppName} Password Reset Successful`,
   text: `Dear ${username},\n\nWe hope this message finds you well.\n\nThis email is to inform you that the password reset for your account on ${process.env.AppName} has been completed successfully. If you did not request this change, please contact our support team immediately.\n\nThis is your new password = ${newPassword}\n\nNB:Make sure to update this password after you login.`,
   to: email,
 };

   await transporter.sendMail(messageObject);
   console.log("Email sent");
};
