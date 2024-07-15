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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendConfirmationMessage = void 0;
const axios_1 = require("../libs/axios");
const nodeMailer_1 = require("../libs/nodeMailer");
const sendConfirmationMessage = (sendingMethod, verfCode, emailAdress, phone, username) => __awaiter(void 0, void 0, void 0, function* () {
    if (sendingMethod === "email" && emailAdress && username) {
        console.log("Sending code through email..");
        // function for sending message with the code through email
        yield (0, nodeMailer_1.sendAccountConfirmationEmail)(verfCode, username, emailAdress);
    }
    else if (sendingMethod === "phone" && phone) {
        console.log("Sending code through phone....");
        // function for sending message with the code through phone number
        yield (0, axios_1.sendAccountConfirmationSms)(verfCode, phone);
    }
});
exports.sendConfirmationMessage = sendConfirmationMessage;
