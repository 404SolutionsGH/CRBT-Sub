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
exports.isSuperAdminAccount = void 0;
const accountSchema_1 = require("../schema/accountSchema");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.isSuperAdminAccount = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Checking if account belongs to a superAdmin..");
    const { id } = req.body;
    const account = yield accountSchema_1.AccountSchema.findById(id);
    if ((account === null || account === void 0 ? void 0 : account.accountType) === "superAdmin") {
        console.log("Account is a SuperAdmin Account");
        req.body.account = account;
        next();
    }
    else {
        console.log("account is not Super Admin Account");
        res.status(401);
        throw new Error("Not authorized to create service");
    }
}));
