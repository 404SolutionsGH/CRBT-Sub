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
exports.getFileFromSys = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/entities/AppError");
const path_1 = require("../../@common/helperMethods/path");
exports.getFileFromSys = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting a file from system....");
    const { fileName } = req.params;
    const path = `${__dirname.replace("\\build\\interface\\middleware", `\\songsData\\${fileName}`)}`;
    console.log("Checking if the file exist....");
    if (!(yield (0, path_1.checkPathExists)(path))) {
        console.log("File does not exist");
        throw new AppError_1.AppError("file does not exist", 404);
    }
    console.log("File exist");
    req.body.path = path;
    next();
}));
