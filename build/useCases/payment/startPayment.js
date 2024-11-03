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
exports.startPayment = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppError_1 = require("../../domain/entities/AppError");
const adminPlanRepoImplementation_1 = require("../../infrastructure/repository/adminPlanRepoImplementation");
const transactionRepoImplementation_1 = require("../../infrastructure/repository/transactionRepoImplementation");
const axios_1 = require("../../libs/axios");
const jwt_1 = require("../../libs/jwt");
const startPayment = (transactionInfo, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const { findPlanById } = new adminPlanRepoImplementation_1.AdminPlanRepoImp();
    const { createTransaction } = new transactionRepoImplementation_1.TransactionRepoImpl();
    const planDetails = yield findPlanById(transactionInfo.planId);
    if (!planDetails)
        throw new AppError_1.AppError("No plan with this id exists", 404);
    const { price } = planDetails;
    // create transaction
    const transDetails = yield createTransaction(transactionInfo);
    const txRef = (0, jwt_1.jwtForPayment)(String(transDetails.id));
    const callBackUrl = `${process.env.BackendBaseUrl}/payments/confirm`;
    const returnUrl = `${process.env.BackendBaseUrl}/payments/success`;
    const url = yield (0, axios_1.paymentRequest)({ amount: price, currency: "ETB", phoneNumber, txRef, callBackUrl, returnUrl });
    if (!url)
        throw new AppError_1.AppError("Something is wrong with the provided payment info please chack and try again", 400);
    return url;
});
exports.startPayment = startPayment;
