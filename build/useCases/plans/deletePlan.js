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
exports.deletePlan = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const adminPlanRepoImplementation_1 = require("../../infrastructure/repository/adminPlanRepoImplementation");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const deletePlan = (planId) => __awaiter(void 0, void 0, void 0, function* () {
    const { getAllMerchnatsByPlanId } = new adminRepoImplementation_1.AdminRepoImp();
    const { flagPlanForDeletion, deletPlanById } = new adminPlanRepoImplementation_1.AdminPlanRepoImp();
    // checking if merchants are on this plan
    const allMerchantsOnThisPlan = yield getAllMerchnatsByPlanId(planId);
    if (allMerchantsOnThisPlan.length !== 0) {
        yield flagPlanForDeletion(planId);
        throw new AppError_1.AppError("Plan deletion failed,but has been flag for automatic deletion later when no one is on it", 409);
    }
    ;
    if (!(yield deletPlanById(planId)))
        throw new AppError_1.AppError("Plan Deletion failed,no such plan exists", 404);
});
exports.deletePlan = deletePlan;
