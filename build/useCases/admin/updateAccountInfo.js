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
exports.updateAdminAccountInfo = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const updateAdminAccountInfo = (updatedInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateAdminAccount } = new adminRepoImplementation_1.AdminRepoImp();
    const updatedAccount = yield updateAdminAccount(updatedInfo);
    if (!updatedAccount)
        throw new AppError_1.AppError("Account update failed,no such account exist", 404);
    const { firstName, lastName, email } = updatedAccount;
    return { firstName, lastName, email };
});
exports.updateAdminAccountInfo = updateAdminAccountInfo;
