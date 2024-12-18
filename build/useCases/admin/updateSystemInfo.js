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
exports.updatePointSettings = exports.updateChapaSecreteKey = exports.updateSystemStatus = void 0;
const systemRepoImplementation_1 = require("../../infrastructure/repository/systemRepoImplementation");
const { setSystemStatus, setChapaSecretKey, updPointSettings } = new systemRepoImplementation_1.SystemRepoImpl();
const updateSystemStatus = (adminId, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield setSystemStatus(status, adminId);
});
exports.updateSystemStatus = updateSystemStatus;
const updateChapaSecreteKey = (adminId, secretKey) => __awaiter(void 0, void 0, void 0, function* () {
    yield setChapaSecretKey(secretKey, adminId);
});
exports.updateChapaSecreteKey = updateChapaSecreteKey;
const updatePointSettings = (settings) => __awaiter(void 0, void 0, void 0, function* () {
    yield updPointSettings(settings);
});
exports.updatePointSettings = updatePointSettings;
