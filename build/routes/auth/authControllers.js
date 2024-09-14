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
exports.loginController = exports.loginControllerForAdmins = exports.signUpController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const accountSchema_1 = require("../../schema/accountSchema");
const bcrypt_1 = require("../../libs/bcrypt");
const jwt_1 = require("../../libs/jwt");
const firebase_1 = require("../../libs/firebase");
// helper methods
const createAccount = (phone, accountType, password, firstName, lastName, res, langPref) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Saving data in data in database...");
    let account;
    if (firstName && lastName) {
        const hashedPassword = yield (0, bcrypt_1.encryptPassword)(password);
        account = yield accountSchema_1.AccountSchema.create({ phone, isVerified: true, password: hashedPassword, accountType, firstName, lastName, langPref: langPref ? langPref : "eng" });
        // console.log("Sending verification code....");
        // await sendConfirmationMessage(account.authorizationMethod, verfCode, email, phone, firstName);
    }
    else {
        account = yield accountSchema_1.AccountSchema.create({ phone, accountType, langPref: langPref ? langPref : "eng", isVerified: true });
    }
    res.status(200).json({
        message: `Account created sucessfully`,
        token: account.accountType === "norm" ? (0, jwt_1.jwtForLogIn)(String(account._id)) : null,
    });
});
exports.signUpController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Account creation began ...");
    const { password, accountType, phone, firstName, lastName, langPref } = req.body;
    console.log("Checking if remaining neccessary data are present...");
    if (password && (accountType === "admin" || accountType === "superAdmin")) {
        console.log("All data present");
        console.log("Account belongs to admin or superAdmin....");
        // console.log("Encypting password...");
        // const encryptedPassword = await encryptPassword(password);
        // console.log("Encyption done");
        yield createAccount(phone, accountType, password, firstName, lastName, res, langPref);
        // console.log("Generating 4 digit verification code");
        // const verfCode = verfCodeGenerator();
        // console.log("Saving data in data in database...");
        // const account = await AccountSchema.create({ email, password: encryptedPassword, phone, accountType, verfCode, firstName });
        // console.log("Sending verification code....");
        // await sendConfirmationMessage(account.authorizationMethod, verfCode, email, phone, firstName);
        // res.status(200).json({ message: `Account created sucessfully,Check your ${account.authorizationMethod === "phone" ? "Sms" : "email"} for confirmation code to verify account` });
    }
    else if (accountType === "norm") {
        console.log("Account normal user...");
        yield createAccount(phone, accountType, null, firstName, lastName, res, langPref);
    }
    else {
        console.log("Not all data is present");
        res.status(400);
        throw new Error("Bad request, some fields in the body was not set");
    }
}));
exports.loginControllerForAdmins = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("An Admin logging in ...");
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
exports.loginController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User logging in ...");
    const { idToken, account } = req.body;
    // checking if account has been verfied
    if (!idToken) {
        res.status(400);
        throw new Error("No idToken passed in request body");
    }
    console.log("Verifying idToken form firebase..");
    if (yield (0, firebase_1.verifyTokenIdFromFirebase)(idToken)) {
        console.log("Id token Verified");
        console.log("Respond Sent with Token, Login Sucessfull");
        res.json({ message: "Login Sucessfull", token: (0, jwt_1.jwtForLogIn)(String(account._id)) });
    }
}));
// export const sendConfirmationCodeController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("User requesting new confirmation message..");
//   const { email, phone } = req.body;
//   const verfCode = verfCodeGenerator();
//   let authorizationMethod = "";
//   console.log("New verfication code created");
//   if (email) {
//     console.log("Updating verfcode in user's account...");
//     const account = await AccountSchema.findOneAndUpdate({ email }, { $set: { verfCode } });
//     console.log("Account updated");
//     if (account) {
//       await sendConfirmationMessage(account.authorizationMethod, verfCode, email, account.phone, account.firstName);
//       authorizationMethod = account.authorizationMethod;
//     }
//   } else if (phone) {
//     console.log("Updating verfcode in user's account");
//     const account = await AccountSchema.findOneAndUpdate({ email }, { $set: { verfCode } });
//     console.log("Account updated");
//     if (account) {
//       await sendConfirmationMessage(account.authorizationMethod, verfCode, account.email, account.phone, account.firstName);
//       authorizationMethod = account.authorizationMethod;
//     }
//   }
//   res.json({ message: `Confirmation code sent successfully,Check ${authorizationMethod === "phone" ? "Sms" : authorizationMethod}  for confirmation code to verify account` });
// });
// export const resetAccountController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("A user is reseting account....");
//   const { account } = req.body;
//   const newPassword = `${account.firstName}${verfCodeGenerator()}4563`;
//   await AccountSchema.findOneAndUpdate({ email: account.email }, { $set: { password: await encryptPassword(newPassword) } });
//   console.log("Account reset complete");
//   console.log("Sending Account reset email...");
//   await sendAccountResetEmail(account.firstName, newPassword, account.email);
//   res.json({ message: "Account reset successfull, Check email for new password" });
// });
// export const accountConfirmationController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("An account is been verified....");
//   const { email, verfCode } = req.body;
//   if (verfCode) {
//     // comparing verfCode in request to the one in the account
//     console.log("Comparing verfCode...");
//     const account = await AccountSchema.findOneAndUpdate({ email, verfCode: Number(verfCode) }, { $set: { verfCode: 0, isVerified: true } });
//     if (account) {
//       console.log("Account verfication successfull");
//       res.json({ message: "Account successfully verified" });
//     } else {
//       console.log("Account verification failed");
//       res.status(401);
//       throw new Error("Account verfication failed,please check verification code again and try again");
//     }
//   } else {
//     res.status(400);
//     throw new Error("No data pass for field verfCode in the request body");
//   }
// });
