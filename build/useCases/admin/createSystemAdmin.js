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
exports.createSystemAdmins = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const roleRepositoryImplementation_1 = require("../../infrastructure/repository/roleRepositoryImplementation");
const bcrypt_1 = require("../../libs/bcrypt");
const nodeMailer_1 = require("../../libs/nodeMailer");
const createSystemAdmins = (accountData) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = accountData;
    const { findByName } = new roleRepositoryImplementation_1.RoleRepoImpl();
    const { createAdmin } = new adminRepoImplementation_1.AdminRepoImp();
    if (!(yield findByName(accountData.role)))
        throw new AppError_1.AppError(`No role with name: ${accountData.role} exists`, 404);
    else if (accountData.password) {
        console.log("Encrypting password..");
        accountData.password = yield (0, bcrypt_1.encryptPassword)(accountData.password);
        console.log("Encryption Done");
    }
    if (!(yield createAdmin(accountData)))
        throw new AppError_1.AppError("An account with this email already exists", 409);
    yield (0, nodeMailer_1.sendAccountPassword)(password, accountData.email);
});
exports.createSystemAdmins = createSystemAdmins;
