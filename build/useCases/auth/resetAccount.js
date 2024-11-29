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
exports.resetAccount = void 0;
const randomData_1 = require("../../@common/helperMethods/randomData");
const Admin_1 = require("../../domain/entities/Admin");
const AppError_1 = require("../../domain/entities/AppError");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const bcrypt_1 = require("../../libs/bcrypt");
const nodeMailer_1 = require("../../libs/nodeMailer");
const resetAccount = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const { findAdminByEmail, updateAdminAccount } = new adminRepoImplementation_1.AdminRepoImp();
    const accountInfo = yield findAdminByEmail(email);
    if (!accountInfo)
        throw new AppError_1.AppError(`No account with email ${email} exist.`, 404);
    const newPassword = new randomData_1.RandomData().getRandomString(7);
    yield updateAdminAccount(Admin_1.Admin.build({ password: yield (0, bcrypt_1.encryptPassword)(newPassword) }));
    console.log("Sending Acount Reset Email");
    yield (0, nodeMailer_1.sendAccountResetEmail)(accountInfo.firstName, newPassword, email);
    console.log("Email sent");
});
exports.resetAccount = resetAccount;
