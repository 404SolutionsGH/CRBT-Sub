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
exports.getAdminAccountInfo = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const adminPlanRepoImplementation_1 = require("../../infrastructure/repository/adminPlanRepoImplementation");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const rewardRepoImplementation_1 = require("../../infrastructure/repository/rewardRepoImplementation");
const getAdminAccountInfo = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const { findAdminById } = new adminRepoImplementation_1.AdminRepoImp();
    const { findPlanById } = new adminPlanRepoImplementation_1.AdminPlanRepoImp();
    const { get } = new rewardRepoImplementation_1.RewardRepoImpl();
    const account = yield findAdminById(adminId);
    if (!account)
        throw new AppError_1.AppError("Account info could not be retrived, such account does not exist", 404);
    const rewardInfo = yield get(adminId);
    const { adminType, lastName, firstName, email, nextSubPayment, planId, createdAt, profile, role } = account;
    return { adminType, lastName, firstName, email, role, profile, nextSubPayment, createdAt, subPlanDetails: yield findPlanById(planId), rewardPoints: rewardInfo ? rewardInfo.points : 0 };
});
exports.getAdminAccountInfo = getAdminAccountInfo;
