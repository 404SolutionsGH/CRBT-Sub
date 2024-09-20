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
exports.userLogin = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const firebase_1 = require("../../libs/firebase");
const jwt_1 = require("../../libs/jwt");
const userLogin = (firebaseToken, phone) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = new userRepoImplemtation_1.UserRepoImp();
    try {
        const { phone_number } = yield (0, firebase_1.verifyTokenIdFromFirebase)(firebaseToken);
        if (!phone_number || phone_number !== phone)
            throw new AppError_1.AppError("Firebase Id verification failed,check idFromFirebase in request body", 401);
    }
    catch (error) {
        throw new AppError_1.AppError(error.message, 400);
    }
    const account = yield userRepo.findUserByPhone(phone);
    if (account)
        return (0, jwt_1.jwtForLogIn)(String(account.id));
    throw new AppError_1.AppError(`No user acccount with ${phone} exists`, 404);
});
exports.userLogin = userLogin;
