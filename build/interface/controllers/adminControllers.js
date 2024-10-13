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
exports.getMerchantsController = exports.getUsersController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/entities/AppError");
const getUsers_1 = require("../../useCases/admin/getUsers");
const getMerchants_1 = require("../../useCases/admin/getMerchants");
exports.getUsersController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params;
    const { id } = req.body;
    let users;
    if (type === "all") {
        users = yield (0, getUsers_1.getAllUsers)();
    }
    else if (type === "sub" || type === "unSub") {
        users = yield (0, getUsers_1.getSubUsers)(id, type);
    }
    else
        throw new AppError_1.AppError("Invalid value passed for type url parameter value should be either all or sub", 400);
    res.status(200).json(users);
}));
exports.getMerchantsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat } = req.params;
    let merchants;
    if (cat === "all") {
        merchants = yield (0, getMerchants_1.getAllMerch)();
    }
    else if (cat === "sub" || cat === "unSub") {
        merchants = yield (0, getMerchants_1.getSubMerch)(cat);
    }
    else
        throw new AppError_1.AppError("Invalid value passed for cat url parameter value should be either all or sub", 400);
    res.status(200).json(merchants);
}));
