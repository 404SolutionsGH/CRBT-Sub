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
exports.systemInfoController = exports.pointSettingsController = exports.chapaSecretController = exports.systemStatusController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const updateSystemInfo_1 = require("../../useCases/admin/updateSystemInfo");
const System_1 = require("../../domain/entities/System");
const AppError_1 = require("../../domain/entities/AppError");
const getSystemInfo_1 = require("../../useCases/admin/getSystemInfo");
exports.systemStatusController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.body;
    yield (0, updateSystemInfo_1.updateSystemStatus)(id, status);
    res.status(200).json({ message: "System updated sucessfully" });
}));
exports.chapaSecretController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, secretKey } = req.body;
    yield (0, updateSystemInfo_1.updateChapaSecreteKey)(id, secretKey);
    res.status(200).json({ message: "System updated sucessfully" });
}));
exports.pointSettingsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, songPoints, minimumWithdraw } = req.body;
    if (!songPoints || !minimumWithdraw)
        throw new AppError_1.AppError("No value was passed for either songPoints or minimumWithdraw", 400);
    yield (0, updateSystemInfo_1.updatePointSettings)(System_1.System.build({ pointSettings: { songPoints, minimumWithdraw }, adminId: id }));
    res.status(200).json({ message: "Data updated sucessfully" });
}));
exports.systemInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ systemInfo: yield (0, getSystemInfo_1.getSystemInfo)() });
}));
