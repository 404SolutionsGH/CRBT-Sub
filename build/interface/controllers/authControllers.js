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
exports.loginController = exports.signUpController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/entities/AppError");
const User_1 = require("../../domain/entities/User");
const createAdmin_1 = require("../../useCases/auth/createAdmin");
const Admin_1 = require("../../domain/entities/Admin");
const userLogin_1 = require("../../useCases/auth/userLogin");
const adminLogin_1 = require("../../useCases/auth/adminLogin");
const isStringNumber_1 = require("../../@common/helperMethods/isStringNumber");
// import { verifyTokenIdFromFirebase } from "../../libs/firebase";
// // helper methods
const nullAndStringTypeChecker = (data1, data2, d1Name, d2Name) => {
    if (!data1 || !data2)
        throw new AppError_1.AppError(!data1 ? `No data passed for ${d1Name}` : `No data was passed for ${d2Name}`, 400);
    else if (typeof data1 !== "string" || typeof data2 != "string")
        throw new AppError_1.AppError(typeof data1 !== "string" ? `Value for ${d1Name} must be a string` : `Value for ${d2Name} must be a string`, 400);
};
exports.signUpController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Account creation began ...");
    const { email, accountType, password, firstName, lastName, planId } = req.body;
    if (!accountType || RegExp(/^\d+$/).test(accountType) || !planId) {
        throw new AppError_1.AppError(`${!accountType ? "No data passed for accountType in request body" : !planId ? "No data passed for planId" : "Value passed for account type must be a string"}`, 400);
    }
    // if (accountType === "user") {
    //   if (!phone) throw new AppError("No data passed for phone in request body", 400);
    //   res.status(201).json({ message: "User account created sucessfully", token: await createUserAccount(User.build({ phone, langPref })) });
    // }
    if (accountType === "admin") {
        if (!email)
            throw new AppError_1.AppError("No data passed for email", 400);
        (0, isStringNumber_1.isStringContentNumber)(planId, "planId");
        yield (0, createAdmin_1.createAdminAccount)(Admin_1.Admin.build({ email, password, adminType: "merchant", firstName, lastName }), planId);
        res.status(201).json({ message: "Admin account created successfully" });
    }
    else
        throw new AppError_1.AppError("Value passed for accountType in request body must be admin or user", 400);
}));
exports.loginController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User logging in ...");
    const { langPref, phone, email, password, accountType } = req.body;
    let jwtToken;
    if (accountType === "user") {
        nullAndStringTypeChecker(langPref, phone, "langPref", "phone");
        //use case for user login
        jwtToken = yield (0, userLogin_1.userLogin)(User_1.User.build({ phone, langPref }));
    }
    else if (accountType == "admin") {
        nullAndStringTypeChecker(email, password, "email", "password");
        // use case for admin log in
        jwtToken = yield (0, adminLogin_1.adminLogin)(email, password);
    }
    else {
        throw new AppError_1.AppError(!accountType ? "No data passed for accontType in body" : `Value for accountType must be either admin or user not ${accountType}`, 400);
    }
    console.log("Login sucessfull");
    res.status(200).json({ message: "Login successfull", token: jwtToken });
}));
