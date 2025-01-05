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
const compileTemplate_1 = require("../@common/email/compileTemplate");
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
        const html = yield (0, compileTemplate_1.compiledHtml)("newAccountEmailWithPassword", { password, companyName: process.env.AppName });
        const messageObject = {
            from: process.env.SmtpUserName,
            subject: `${process.env.AppName} Account creation successfull.`,
            html,
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
        const html = yield (0, compileTemplate_1.compiledHtml)("newAccountCongratulatoryEmail", { firstName, companyName: process.env.AppName });
        const messageObject = {
            from: process.env.SmtpUserName,
            subject: ` Welcome to ${process.env.AppName}. Account creation successfull.`,
            html,
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
    const html = yield (0, compileTemplate_1.compiledHtml)("passwordResetEmail", { firstName, pasword: newPassword, companyName: process.env.AppName });
    const messageObject = {
        from: process.env.SmtpUserName,
        subject: `${process.env.AppName} Password Reset Successful`,
        html,
        to: email,
    };
    yield transporter.sendMail(messageObject);
    console.log("Email sent");
});
exports.sendAccountResetEmail = sendAccountResetEmail;
