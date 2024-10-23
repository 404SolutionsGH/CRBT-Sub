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
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const jwt_1 = require("../../libs/jwt");
const userLogin = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { createUser, findUserByPhone } = new userRepoImplemtation_1.UserRepoImp();
    let account = yield findUserByPhone(userData.phone);
    if (!account)
        account = yield createUser(userData);
    return { account, token: (0, jwt_1.jwtForLogIn)(String(account.id)) };
});
exports.userLogin = userLogin;
