"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArrayOfFiles = exports.getFilesFromReq = void 0;
const multer_1 = __importDefault(require("multer"));
const getFilesFromReq = (profilleName = null, songName = null) => {
    return (0, multer_1.default)().fields([
        { name: profilleName ? profilleName : "profile", maxCount: 1 },
        { name: songName ? songName : "song", maxCount: 1 },
    ]);
};
exports.getFilesFromReq = getFilesFromReq;
const getArrayOfFiles = () => {
    return (0, multer_1.default)().fields([{ name: "song", maxCount: 40 }]);
};
exports.getArrayOfFiles = getArrayOfFiles;
