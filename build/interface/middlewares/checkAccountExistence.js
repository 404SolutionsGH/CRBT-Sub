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
exports.checkingForAccount = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const accountSchema_1 = require("../../schema/accountSchema");
exports.checkingForAccount = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Client data received.Checking if it exist in database....");
    const { email, phone, accountType } = req.body;
    if ((phone && accountType === "admin") || accountType === "superAdmin") {
        // console.log("Checking if recieved data exists in database(Accont creation)...");
        // let account = await AccountSchema.find({ email });
        // if (account.length !== 0) {
        //   console.log("Account with this email exist");
        //   throw new Error("An account with this email already exist");
        // }
        const account = yield accountSchema_1.AccountSchema.find({ phone });
        if (account.length !== 0) {
            console.log("Account with this phone number exist");
            throw new Error("An account with this phone number already exist");
        }
    }
    else if (phone && accountType === "norm") {
        const account = yield accountSchema_1.AccountSchema.find({ phone });
        if (account.length !== 0) {
            console.log("Account with this phone number exist");
            throw new Error("An account with this phone number already exist");
        }
    }
    else if (phone) {
        console.log("Checking if recieved data exists in database...");
        const account = yield accountSchema_1.AccountSchema.find({ phone });
        if (account.length === 0) {
            console.log("Account with this email or phone number does not exist");
            throw new Error("No account with this  phone exist");
        }
        else {
            console.log("Account exist");
            req.body.account = account[0];
        }
    }
    else {
        res.status(400);
        throw new Error("Bad request invalid request body");
    }
    next();
}));
