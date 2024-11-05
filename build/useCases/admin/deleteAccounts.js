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
exports.deleteMerchantAccount = exports.deleteUserAccount = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const deleteUserAccount = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleteAccount } = new userRepoImplemtation_1.UserRepoImp();
    if (!(yield deleteAccount(userId)))
        throw new AppError_1.AppError("Deletion Failed no account with this id exist", 404);
});
exports.deleteUserAccount = deleteUserAccount;
const deleteMerchantAccount = (merchantId) => __awaiter(void 0, void 0, void 0, function* () {
    const { deleteAccount } = new adminRepoImplementation_1.AdminRepoImp();
    if (!(yield deleteAccount(merchantId)))
        throw new AppError_1.AppError("Deletion Failed no account with this id exist", 404);
});
exports.deleteMerchantAccount = deleteMerchantAccount;
