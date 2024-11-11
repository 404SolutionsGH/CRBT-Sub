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
exports.createAdminAccount = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const bcrypt_1 = require("../../libs/bcrypt");
const subcribePlan_1 = require("../plans/subcribePlan");
const createAdminAccount = (adminData_1, planId_1, ...args_1) => __awaiter(void 0, [adminData_1, planId_1, ...args_1], void 0, function* (adminData, planId, isSuperAdmin = false) {
    const { email, password } = adminData;
    const adminRepo = new adminRepoImplementation_1.AdminRepoImp();
    if (password) {
        console.log("Encrypting password..");
        adminData.password = yield (0, bcrypt_1.encryptPassword)(password);
        console.log("Encryption Done");
    }
    const account = yield adminRepo.createAdmin(adminData);
    if (!account)
        throw new AppError_1.AppError(`Admin account with email ${email} already exist`, 409);
    console.log("Subscribing merchants to a plan..");
    if (isSuperAdmin) {
        yield (0, subcribePlan_1.subscibeToPlan)(account.id, planId, "", true);
    }
});
exports.createAdminAccount = createAdminAccount;
