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
exports.paymentRequest = exports.sendAccountConfirmationSms = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const string_1 = require("../@common/constants/string");
dotenv_1.default.config();
const sendAccountConfirmationSms = (verfCode, phone) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Sending Sms.....");
    const response = yield axios_1.default.get(`https://sms.smsnotifygh.com/smsapi?key=${process.env.SmsApiKey}&to=${phone}&msg=Welcome to ${process.env.AppName}\n\n Your verification code is: ${verfCode}\n\n Please enter this code on the verification page to activate your account.&sender_id=CRBT`);
    console.log(`Sms Send Status:${response.data.code}, message:${response.data.message}`);
});
exports.sendAccountConfirmationSms = sendAccountConfirmationSms;
// this method return the url to the checkout page if sucessfull or null if not.
const paymentRequest = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, callBackUrl, currency, phoneNumber, returnUrl, txRef } = paymentInfo;
    const response = yield axios_1.default.post(string_1.ChapaPaymentLink, { amount, currency, callback_url: callBackUrl, return_url: returnUrl, phone_number: phoneNumber, tx_ref: txRef }, { headers: { Authorization: `Bearer ${process.env.ChapaSecretKey}` } });
    console.log(`Payment request status code=${response.status}`);
    const { data } = response.data;
    if (data) {
        return data.checkout_url;
    }
    return null;
});
exports.paymentRequest = paymentRequest;
