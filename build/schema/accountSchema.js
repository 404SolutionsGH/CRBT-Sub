"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// the userSchema
const accountSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        default: "N/A",
    },
    lastName: {
        type: String,
        default: "N/A",
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        default: "N/A"
    },
    accountType: {
        type: String,
        enum: ["norm", "admin", "superAdmin"],
    },
    authorizationMethod: {
        type: String,
        enum: ["phone", "email"],
        default: "email",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verfCode: {
        type: Number,
        default: 0,
    },
    langPref: {
        type: String,
        required: true
    },
    accountBalance: String, // for only normal users
    subscribedServices: Array, // for only normal users
    unsubscribeService: Array, // for only normal users
    transactionHistory: Array, // for only normal users
    paymentInfo: Array, // this for only admin accounts
});
exports.AccountSchema = mongoose_1.default.model("Account", accountSchema);
