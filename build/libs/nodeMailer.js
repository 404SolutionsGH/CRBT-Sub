"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAccountResetEmail = exports.sendAccountCreationEmail = exports.sendAccountPassword = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    host: "mail.crbtmusicpro.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SmtpUserName,
        pass: process.env.SmtpSecret,
    },
});
const sendAccountPassword = (password, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Sending Account Password to user....");
        const messageObject = {
            from: process.env.SmtpUserName,
            subject: ` Welcome to ${process.env.AppName}. Account creation successfull.`,
            text: `\n\nWelcome to ${process.env.AppName}\nWe are excited to have you on board.The password to your account you requested is: ${password}.\nIf you did not request for this account to be created , please ignore this email or contact our support team for assistance @ admin@crbtmusicpro.com.\n\nThank you for joining  ${process.env.AppName}!\n`,
            to: email,
        };
        yield transporter.sendMail(messageObject);
        console.log("Email sent");
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendAccountPassword = sendAccountPassword;
const sendAccountCreationEmail = (email, firstName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messageObject = {
            from: process.env.SmtpUserName,
            subject: ` Welcome to ${process.env.AppName}. Account creation successfull.`,
            text: `\n\nHello ${firstName} Welcome to ${process.env.AppName}\nWe are excited to have you on board\nIf you did not create this account to be created , please ignore this email or contact our support team for assistance @ admin@crbtmusicpro.com.\n\nThank you for joining  ${process.env.AppName}!\n`,
            to: email,
        };
        yield transporter.sendMail(messageObject);
        console.log("Email sent");
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendAccountCreationEmail = sendAccountCreationEmail;
const sendAccountResetEmail = (firstName, newPassword, email) => __awaiter(void 0, void 0, void 0, function* () {
    const messageObject = {
        from: process.env.SmtpUserName,
        subject: `${process.env.AppName} Password Reset Successful`,
        text: `Dear ${firstName},\n\nWe hope this message finds you well.\n\nThis email is to inform you that the password reset for your account on ${process.env.AppName} has been completed successfully. If you did not request this change, please contact our support team immediately.\n\nThis is your new password = ${newPassword}\n\nNB:Make sure to update this password after you login.`,
        to: email,
    };
    yield transporter.sendMail(messageObject);
    console.log("Email sent");
});
exports.sendAccountResetEmail = sendAccountResetEmail;
