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
exports.accountInfoController = exports.accountUpdateController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const updateAccountInfo_1 = require("../../useCases/user/updateAccountInfo");
const User_1 = require("../../domain/entities/User");
const AppError_1 = require("../../domain/entities/AppError");
const getAccountInfo_1 = require("../../useCases/user/getAccountInfo");
exports.accountUpdateController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User updating account info....");
    const { firstName, lastName, id, langPref, phone, accountBalance } = req.body;
    if ((typeof firstName !== "string" && firstName) || (typeof lastName !== "string" && lastName))
        throw new AppError_1.AppError(typeof firstName !== "string" ? "Value for firstName should be a string" : "Value for lastName should be a string", 400);
    const updatedData = yield (0, updateAccountInfo_1.updateAccountInfo)(User_1.User.build({ firstName, lastName, id: Number(id), langPref, phone, accountBalance }));
    if (!updatedData) {
        throw new AppError_1.AppError("Update failed, account does not exist", 404);
    }
    res.status(200).json({ message: "Account updated", updatedAccount: updatedData });
}));
exports.accountInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { firstName, lastName, accountBalance, phone, langPref, subSongDetails, rewardPoints, createdAt } = yield (0, getAccountInfo_1.getAccountInfo)(Number(id));
    res.status(200).json({ firstName, lastName, accountBalance, phone, langPref, rewardPoints, createdAt, subSongDetails });
}));
