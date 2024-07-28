"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilesFromReq = void 0;
const multer_1 = __importDefault(require("multer"));
const getFilesFromReq = () => {
    return (0, multer_1.default)({ limits: { fileSize: 10000000 } }).fields([
        { name: "profile", maxCount: 1 },
        { name: "song", maxCount: 1 },
    ]);
};
exports.getFilesFromReq = getFilesFromReq;
