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
exports.createUserAccount = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const jwt_1 = require("../../libs/jwt");
const createUserAccount = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = new userRepoImplemtation_1.UserRepoImp();
    const account = yield userRepo.createUser(userData);
    if (account)
        return (0, jwt_1.jwtForLogIn)(String(account.id));
    throw new AppError_1.AppError(`Account with this phone number ${userData.phone} already exist`, 409);
});
exports.createUserAccount = createUserAccount;
