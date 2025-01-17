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
exports.errorHandler = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const sequelize_1 = require("sequelize");
const loger_1 = require("../../@common/helperMethods/logs/loger");
const errorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else if (err instanceof sequelize_1.ValidationError) {
        console.log(err);
        res.status(400).json({ error: err.message.split(":")[1] });
    }
    else if (err instanceof SyntaxError) {
        yield (0, loger_1.logToFile)("SynthaxErrors.txt", err.message);
        res.status(400).json({ error: err.message });
    }
    else {
        console.log(err);
        yield (0, loger_1.logToFile)("ServerErrors.txt", err.message);
        res.status(500).json({ error: "Server Error" });
    }
});
exports.errorHandler = errorHandler;
