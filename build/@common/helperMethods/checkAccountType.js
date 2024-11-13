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
exports.isRequestFromSuperAdmin = void 0;
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const isRequestFromSuperAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { findAdminById } = new adminRepoImplementation_1.AdminRepoImp();
    const accountInfo = yield findAdminById(Number(id));
    if (!accountInfo || (accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.adminType) !== "system")
        return false;
    console.log("Account belongs to SuperAdmin");
    return true;
});
exports.isRequestFromSuperAdmin = isRequestFromSuperAdmin;
