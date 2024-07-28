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
exports.CrbtServiceSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// the userSchema
const crbtServiceSchema = new mongoose_1.default.Schema({
    ownerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Account",
    },
    serviceName: String,
    servicePrice: String, // price being paid to run this service
    planType: {
        type: String,
        enum: ["basic", "gold", "silver"],
        default: "basic"
    },
    songs: Array, // array of the songs id 
    albums: Array, // array of strings of album names
    lang: String,
    category: String,
    date: {
        type: String,
        default: new Date().toISOString(), // format: YYYY-MM-DDThh:mm:ss.741Z    NB: T is what separate the date from the time. 
    },
    numberOfSubscribers: Number,
});
exports.CrbtServiceSchema = mongoose_1.default.model("CrbtService", crbtServiceSchema);