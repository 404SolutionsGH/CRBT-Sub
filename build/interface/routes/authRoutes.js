"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
exports.authRouter = (0, express_1.Router)();
// endpoint for creating account for users and mercahnts
exports.authRouter.post("/signup", authControllers_1.signUpController);
exports.authRouter.post("/login", authControllers_1.loginController);
// // authRouter.post("/send-confirmationCode", checkingForAccount, sendConfirmationCodeController);
// authRouter.post("/admin/login", checkingForAccount, loginControllerForAdmins);
// authRouter.post("/login", checkingForAccount, loginController);
// authRouter.post("/confirm-account", checkingForAccount, accountConfirmationController);
// authRouter.post("/reset-account", checkingForAccount,resetAccountController);
