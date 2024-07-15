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
const verfCodeGenerator_1 = require("../../components/verfCodeGenerator");
const sendConfirmationMessage_1 = require("../../components/sendConfirmationMessage");
const jwt_1 = require("../../libs/jwt");
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
        const verfCode = (0, verfCodeGenerator_1.verfCodeGenerator)();
        console.log("Saving data in data in database...");
        const account = yield accountSchema_1.AccountSchema.create({ email, password: encryptedPassword, phone, accountType, verfCode, username });
        console.log("Sending verification code....");
        yield (0, sendConfirmationMessage_1.sendConfirmationMessage)(account.authorizationMethod, verfCode, email, phone, username);
        res.status(200).json({ message: `Account created sucessfully,Check your ${account.authorizationMethod === "phone" ? "Sms" : "email"} for confirmation code to verify account` });
    }
    else {
        console.log("Not all data is present");
        res.status(400);
        throw new Error("Bad request, some fields in the body was not set");
    }
}));
exports.loginController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User logging in ...");
    const { password, account } = req.body;
    // checking if account has been verfied
    if (!account.isVerified) {
        res.status(401);
        throw new Error("Account is not verified,please verify account to login");
    }
    if (password) {
        console.log("Verifying password..");
        if (yield (0, bcrypt_1.verifyPassword)(password, account.password)) {
            console.log("Password Verified");
            console.log("Respond Sent with Token, Login Sucessfull");
            res.json({ message: "Login Sucessfull", token: (0, jwt_1.jwtForLogIn)(String(account._id)) });
        }
        else {
            console.log("Password Incorrect");
            res.status(400);
            throw new Error("Invalid Login Credentails");
        }
    }
    else {
        res.status(400);
        throw new Error("No data passed for password in request body");
    }
}));
exports.accountConfirmationController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("An account is been verified....");
    const { email, verfCode } = req.body;
    if (verfCode) {
        // comparing verfCode in request to the one in the account
        console.log("Comparing verfCode...");
        const account = yield accountSchema_1.AccountSchema.findOneAndUpdate({ email, verfCode: Number(verfCode) }, { $set: { verfCode: 0, isVerified: true } });
        if (account) {
            console.log("Account verfication successfull");
            res.json({ message: "Account successfully verified" });
        }
        else {
            console.log("Account verification failed");
            res.status(401);
            throw new Error("Account verfication failed,please check verification code again and try again");
        }
    }
    else {
        res.status(400);
        throw new Error("No data pass for field verfCode in the request body");
    }
}));
exports.resetAccountController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("A user is reseting account....");
    const { account } = req.body;
    const newPassword = `${account.username}${(0, verfCodeGenerator_1.verfCodeGenerator)()}4563`;
    yield accountSchema_1.AccountSchema.findOneAndUpdate({ email: account.email }, { $set: { password: yield (0, bcrypt_1.encryptPassword)(newPassword) } });
    console.log("Account reset complete");
    console.log("Sending Account reset email...");
    yield (0, nodeMailer_1.sendAccountResetEmail)(account.username, newPassword, account.email);
    res.json({ message: "Account reset successfull, Check email for new password" });
}));
exports.sendConfirmationCodeController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User requesting new confirmation message..");
    const { email, username } = req.body;
    const verfCode = (0, verfCodeGenerator_1.verfCodeGenerator)();
    let authorizationMethod = "";
    console.log("New verfication code created");
    if (email) {
        console.log("Updating verfcode in user's account...");
        const account = yield accountSchema_1.AccountSchema.findOneAndUpdate({ email }, { $set: { verfCode } });
        console.log("Account updated");
        if (account) {
            yield (0, sendConfirmationMessage_1.sendConfirmationMessage)(account.authorizationMethod, verfCode, email, account.phone, account.username);
            authorizationMethod = account.authorizationMethod;
        }
    }
    else if (username) {
        console.log("Updating verfcode in user's account");
        const account = yield accountSchema_1.AccountSchema.findOneAndUpdate({ email }, { $set: { verfCode } });
        console.log("Account updated");
        if (account) {
            yield (0, sendConfirmationMessage_1.sendConfirmationMessage)(account.authorizationMethod, verfCode, account.email, account.phone, username);
            authorizationMethod = account.authorizationMethod;
        }
    }
    res.json({ message: `Confirmation code sent successfully,Check ${authorizationMethod === "phone" ? "Sms" : authorizationMethod}  for confirmation code to verify account` });
}));
