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
exports.getSubMerch = exports.getAllMerch = void 0;
const adminPlanRepoImplementation_1 = require("../../infrastructure/repository/adminPlanRepoImplementation");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const subAdminPlansRepoImplementation_1 = require("../../infrastructure/repository/subAdminPlansRepoImplementation");
const getAllMerch = () => __awaiter(void 0, void 0, void 0, function* () {
    const { getAllMerchants } = new adminRepoImplementation_1.AdminRepoImp();
    return yield getAllMerchants();
});
exports.getAllMerch = getAllMerch;
const getSubMerch = (type) => __awaiter(void 0, void 0, void 0, function* () {
    const { getAllPlans } = new adminPlanRepoImplementation_1.AdminPlanRepoImp();
    const { findSubscriptionByPlanIds } = new subAdminPlansRepoImplementation_1.SubAdminPlansRepoImp();
    const allPlans = yield getAllPlans();
    if (allPlans.length === 0)
        return [];
    const allPanIds = [];
    allPlans.forEach((plan) => {
        allPanIds.push(plan.planId);
    });
    return yield findSubscriptionByPlanIds(allPanIds, type);
});
exports.getSubMerch = getSubMerch;
