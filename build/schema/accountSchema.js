"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
        default: "N/A",
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
        required: true,
    },
    accountBalance: String, // for only normal users
    subscribedServices: Array, // for only normal users
    unsubscribeService: Array, // for only normal users
    transactionHistory: Array, // for only normal users
    paymentInfo: Array, // this for only admin accounts
    service: {
        type: mongoose_1.Schema.Types.ObjectId, // id of the crbt service owned by the account if is of the type admin or superAdmin
        ref: "CrbtService",
    },
});
exports.AccountSchema = mongoose_1.default.model("Account", accountSchema);
