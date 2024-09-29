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
exports.getAccountInfo = void 0;
const serviceRepoImplementation_1 = require("../../infrastructure/repository/serviceRepoImplementation");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const getAccountInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = new userRepoImplemtation_1.UserRepoImp();
    const serviceRepo = new serviceRepoImplementation_1.ServiceRepoImp();
    const accountInfo = yield userRepo.findUserById(id);
    const { firstName, lastName, accountBalance, phone, langPref, subService } = accountInfo;
    const unSubService = yield serviceRepo.findServiceWithIds(accountInfo.unSubService);
    return { firstName, lastName, accountBalance, phone, langPref, subService, unSubService };
});
exports.getAccountInfo = getAccountInfo;
