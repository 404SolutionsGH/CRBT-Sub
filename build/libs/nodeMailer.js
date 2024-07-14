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
exports.sendAccountConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SmtpUserName,
        pass: process.env.SmtpSecret,
    },
});
const sendAccountConfirmationEmail = (verfCode, username, email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Sending Account confirmation email....");
    const messageObject = {
        subject: ` Welcome to ${process.env.AppName} Verify Your Email`,
        text: `Dear ${username},\nWelcome to ${process.env.AppName}\nWe are excited to have you on board. To complete your registration, please verify your email address using the four-digit code below:\n\nYour Verification Code: ${verfCode}\n\nPlease enter this code on the verification page to activate your account.\nIf you did not create an account with us, please ignore this email or contact our support team for assistance.\n\nThank you for joining  ${process.env.AppName}!\n`,
        to: email,
    };
    yield transporter.sendMail(messageObject);
    console.log("Email sent");
});
exports.sendAccountConfirmationEmail = sendAccountConfirmationEmail;
