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
exports.sendConfirmationCodeController = exports.resetAccountController = exports.accountConfirmationController = exports.loginController = exports.signUpController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const accountSchema_1 = require("../../schema/accountSchema");
const bcrypt_1 = require("../../libs/bcrypt");
const nodeMailer_1 = require("../../libs/nodeMailer");
const axios_1 = require("../../libs/axios");
exports.signUpController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Account creation began ...");
    const { email, password, accountType, phone, username } = req.body;
    console.log("Checking if remaining neccessary data are present...");
    if (password && accountType && username) {
        console.log("All data present");
        console.log("Encypting password...");
        const encryptedPassword = yield (0, bcrypt_1.encryptPassword)(password);
        console.log("Encyption done");
        console.log("Generating 4 digit verification code");
        const verfCode = Math.floor(Math.random() * 9000) + 1000;
        console.log("Saving data in data in database...");
        const account = yield accountSchema_1.AccountSchema.create({ email, password: encryptedPassword, phone, accountType, verfCode, username });
        console.log("Sending verification code....");
        if (account.authorizationMethod === "email") {
            console.log("Sending code through email..");
            // function for sending message with the code through email
            yield (0, nodeMailer_1.sendAccountConfirmationEmail)(verfCode, username, email);
        }
        else {
            // function for sending message with the code through phone number
            console.log("Sending code through phone....");
            yield (0, axios_1.sendAccountConfirmationSms)(verfCode, phone);
        }
        res.status(200).json({ message: `Account created sucessfully,Check your ${(account.authorizationMethod === "phone") ? "Sms" : "email"} for confirmation code to verify account` });
    }
    else {
        console.log("Not all data is present");
        res.status(400);
        throw new Error("Bad request, some fields in the body was not set");
    }
}));
exports.loginController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.accountConfirmationController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.resetAccountController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.sendConfirmationCodeController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
