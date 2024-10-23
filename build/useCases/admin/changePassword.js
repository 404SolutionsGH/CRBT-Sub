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
exports.changePassword = void 0;
const Admin_1 = require("../../domain/entities/Admin");
const AppError_1 = require("../../domain/entities/AppError");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const bcrypt_1 = require("../../libs/bcrypt");
const changePassword = (newPasswword, oldPassword, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const { findAdminById, updateAdminAccount } = new adminRepoImplementation_1.AdminRepoImp();
    const accountInfo = yield findAdminById(adminId);
    if (!accountInfo)
        throw new AppError_1.AppError("Password change failed , nosuch account exist", 404);
    if (yield (0, bcrypt_1.verifyPassword)(oldPassword, accountInfo.password)) {
        const password = yield (0, bcrypt_1.encryptPassword)(newPasswword);
        yield updateAdminAccount(Admin_1.Admin.build({ password }));
    }
    else {
        throw new AppError_1.AppError("The old password you entered is incorrect. Please try again.", 401);
    }
});
exports.changePassword = changePassword;
