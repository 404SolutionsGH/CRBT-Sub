import nodeMailer from "nodemailer";
import dotenv from "dotenv";
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
    const messageObject = {
      from:process.env.SmtpUserName,
      subject: ` Welcome to ${process.env.AppName}. Account creation successfull.`,
      text: `\n\nWelcome to ${process.env.AppName}\nWe are excited to have you on board.The password to your account you requested is: ${password}.\nIf you did not request for this account to be created , please ignore this email or contact our support team for assistance @ admin@crbtmusicpro.com.\n\nThank you for joining  ${process.env.AppName}!\n`,
      to: email,
    };

    await transporter.sendMail(messageObject);
    console.log("Email sent");
  } catch (error) {
    console.log(error);
  }
};

export const sendAccountCreationEmail= async (email:string,firstName:string)=>{
try {
  console.log("Sending Account Password to user....");
  const messageObject = {
    from: process.env.SmtpUserName,
    subject: ` Welcome to ${process.env.AppName}. Account creation successfull.`,
    text: `\n\nHello ${firstName} Welcome to ${process.env.AppName}\nWe are excited to have you on board\nIf you did not create this account to be created , please ignore this email or contact our support team for assistance @ admin@crbtmusicpro.com.\n\nThank you for joining  ${process.env.AppName}!\n`,
    to: email,
  };

  await transporter.sendMail(messageObject);
  console.log("Email sent");
} catch (error) {
  console.log(error);
}

}

export const sendAccountResetEmail = async (firstName: string, newPassword: string, email: string) => {
  const messageObject = {
    from: process.env.SmtpUserName,
    subject: `${process.env.AppName} Password Reset Successful`,
    text: `Dear ${firstName},\n\nWe hope this message finds you well.\n\nThis email is to inform you that the password reset for your account on ${process.env.AppName} has been completed successfully. If you did not request this change, please contact our support team immediately.\n\nThis is your new password = ${newPassword}\n\nNB:Make sure to update this password after you login.`,
    to: email,
  };

  await transporter.sendMail(messageObject);
  console.log("Email sent");
};
