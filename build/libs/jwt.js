"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.jwtForSignUp = exports.jwtForLogIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const AppError_1 = require("../domain/entities/AppError");
dotenv_1.default.config();
const jwtForLogIn = (id) => {
    if (process.env.JwtSecretKey !== undefined) {
        return jsonwebtoken_1.default.sign({ userId: id }, process.env.JwtSecretKey, { expiresIn: "20d" });
    }
    else {
        console.log("env variable JwtSecretKey not defined on server");
        throw new AppError_1.AppError("Server errror", 500);
    }
};
exports.jwtForLogIn = jwtForLogIn;
const jwtForSignUp = (id, verfCode) => {
    if (process.env.JwtSecretKey !== undefined) {
        return jsonwebtoken_1.default.sign({ userId: id, code: verfCode }, process.env.JwtSecretKey, { expiresIn: "1hr" });
    }
    else {
        console.log("env variable JwtSecretKey not defined on server");
        throw new AppError_1.AppError("Server errror", 500);
    }
};
exports.jwtForSignUp = jwtForSignUp;
const verifyToken = (token) => {
    try {
        if (process.env.JwtSecretKey !== undefined) {
            return jsonwebtoken_1.default.verify(token, process.env.JwtSecretKey);
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
};
exports.verifyToken = verifyToken;
