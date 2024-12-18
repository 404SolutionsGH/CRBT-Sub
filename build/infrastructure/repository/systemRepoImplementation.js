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
exports.SystemRepoImpl = void 0;
const System_1 = require("../../domain/entities/System");
class SystemRepoImpl {
    getSysInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield System_1.System.findAll({ attributes: { exclude: ["id", "adminId"] } }))[0];
        });
    }
    updPointSettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pointSettings, adminId } = settings;
            yield System_1.System.update({ pointSettings }, { where: { adminId } });
        });
    }
    getSystemStatus(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!adminId) {
                return (yield System_1.System.findAll())[0].status;
            }
            return (yield System_1.System.findOne({ where: { adminId } })).status;
        });
    }
    setSystemStatus(status, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield System_1.System.update({ status }, { where: { adminId } });
        });
    }
    setChapaSecretKey(key, adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield System_1.System.update({ chapaSecretKey: key }, { where: { adminId } });
        });
    }
    getChapaSecretkey(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!adminId) {
                return (yield System_1.System.findAll())[0].chapaSecretKey;
            }
            return (yield System_1.System.findOne({ where: { adminId } })).chapaSecretKey;
        });
    }
}
exports.SystemRepoImpl = SystemRepoImpl;
