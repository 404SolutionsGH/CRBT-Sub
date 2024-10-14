"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringContentNumber = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const isStringContentNumber = (content, variableName) => {
    const alphaReg = /[a-zA-Z]/;
    const decimalReg = /\./;
    if (alphaReg.test(content)) {
        throw new AppError_1.AppError(`Value for ${variableName} must be an integer not a character or alphanumeric characters`, 400);
    }
    else if (decimalReg.test(content)) {
        throw new AppError_1.AppError(`Value for ${variableName} must be an integer not decimal`, 400);
    }
};
exports.isStringContentNumber = isStringContentNumber;
