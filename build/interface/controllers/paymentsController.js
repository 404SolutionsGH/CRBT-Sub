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
exports.confirmPaymentController = exports.sucessfullPaymentController = exports.startPaymentController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const startPayment_1 = require("../../useCases/payment/startPayment");
const Transactions_1 = require("../../domain/entities/Transactions");
const AppError_1 = require("../../domain/entities/AppError");
const confirmPayment_1 = require("../../useCases/payment/confirmPayment");
exports.startPaymentController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, planId, phoneNumber } = req.body;
    if (!planId || !phoneNumber || typeof phoneNumber !== "string")
        throw new AppError_1.AppError(!planId ? "No data passed for planId or phoneNumber" : "phoneNumber must be a string", 400);
    const checkOutPageUrl = yield (0, startPayment_1.startPayment)(Transactions_1.Transaction.build({ email, planId }), phoneNumber);
    res.status(200).json({ checkoutUrl: checkOutPageUrl });
}));
exports.sucessfullPaymentController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect("http://crbtmusicpro.com");
}));
exports.confirmPaymentController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event, tx_ref, status } = req.body;
    if (event === "charge.success" && status === "success")
        yield (0, confirmPayment_1.confirmPayment)(tx_ref);
    res.status(200).send(200);
}));
