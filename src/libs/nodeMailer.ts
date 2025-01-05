import nodeMailer from "nodemailer";
import dotenv from "dotenv";
import { compiledHtml } from "../@common/email/compileTemplate";
dotenv.config();

const transporter = nodeMailer.createTransport({
  host: "mail.crbtmusicpro.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SmtpUserName,
    pass: process.env.SmtpSecret,
  },
});

export const sendAccountPassword = async (password: string, email: string) => {
  try {
    console.log("Sending Account Password to user....");
    const html = await compiledHtml("newAccountEmailWithPassword", { password, companyName: process.env.AppName });
    const messageObject = {
      from: process.env.SmtpUserName,
      subject: `${process.env.AppName} Account creation successfull.`,
      html,
      to: email,
    };

    await transporter.sendMail(messageObject);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

export const sendAccountCreationEmail = async (email: string, firstName: string) => {
  try {
    const html = await compiledHtml("newAccountCongratulatoryEmail", { firstName, companyName: process.env.AppName });
    const messageObject = {
      from: process.env.SmtpUserName,
      subject: ` Welcome to ${process.env.AppName}. Account creation successfull.`,
      html,
      to: email,
    };

    await transporter.sendMail(messageObject);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

export const sendAccountResetEmail = async (firstName: string, newPassword: string, email: string) => {
  const html = await compiledHtml("passwordResetEmail", { firstName, pasword: newPassword, companyName: process.env.AppName });
  const messageObject = {
    from: process.env.SmtpUserName,
    subject: `${process.env.AppName} Password Reset Successful`,
    html,
    to: email,
  };

  await transporter.sendMail(messageObject);
  console.log("Email sent");
};
