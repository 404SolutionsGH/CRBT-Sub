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
exports.isSuperAdminAccount = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const checkAccountType_1 = require("../../@common/helperMethods/checkAccountType");
const AppError_1 = require("../../domain/entities/AppError");
exports.isSuperAdminAccount = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params;
    if (type && type === "sub")
        next();
    else {
        console.log("Checking if account belongs to a superAdmin..");
        const { id } = req.body;
        if (!(yield (0, checkAccountType_1.isRequestFromSuperAdmin)(id)))
            throw new AppError_1.AppError("This Account is not authorized", 401);
        next();
    }
}));
