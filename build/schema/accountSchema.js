"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// the userSchema
const accountSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["norm", "admin"],
    },
    authorizationMethod: {
        type: String,
        enum: ["phone", "email"],
        default: "phone",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verfCode: {
        type: Number,
        default: 0,
    },
    accountBalance: String, // for only normal users
    subscribedServices: Array, // for only normal users
    unsubscribeService: Array, // for only normal users
    transactionHistory: Array, // for only normal users
    paymentInfo: Array, // this for only admin accounts
});
exports.AccountSchema = mongoose_1.default.model("Account", accountSchema);
