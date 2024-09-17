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
exports.adminLogin = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const bcrypt_1 = require("../../libs/bcrypt");
const jwt_1 = require("../../libs/jwt");
const adminLogin = (email, pasword) => __awaiter(void 0, void 0, void 0, function* () {
    const adminRepo = new adminRepoImplementation_1.AdminRepoImp();
    const account = yield adminRepo.findAdminByEmail(email);
    if (account) {
        if (!(yield (0, bcrypt_1.verifyPassword)(pasword, account.password)))
            throw new AppError_1.AppError("Invalid email and password", 401);
        return (0, jwt_1.jwtForLogIn)(String(account.id));
    }
    throw new AppError_1.AppError(`No admin account with ${email} exist`, 404);
});
exports.adminLogin = adminLogin;
