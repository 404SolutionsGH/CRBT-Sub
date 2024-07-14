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
exports.sendAccountConfirmationSms = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendAccountConfirmationSms = (verfCode, phone) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Sending Sms.....");
    const response = yield axios_1.default.get(`https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SmsApiKey}&to=${phone}&from=${process.env.AppName}&sms=Welcome to ${process.env.AppName}\n\nYour verification code is: ${verfCode}\n\nPlease enter this code on the verification page to activate your account. If you did not create an account, please ignore this message or contact support.\n\nThank you!`);
    console.log(`Sms Send Status:${response.data.code}, message:${response.data.message}`);
});
exports.sendAccountConfirmationSms = sendAccountConfirmationSms;
