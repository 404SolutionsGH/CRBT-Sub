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
exports.updateAdminPlan = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const adminPlanRepoImplementation_1 = require("../../infrastructure/repository/adminPlanRepoImplementation");
const updateAdminPlan = (updatedPlan) => __awaiter(void 0, void 0, void 0, function* () {
    const { updatePlanById } = new adminPlanRepoImplementation_1.AdminPlanRepoImp();
    const updatedData = yield updatePlanById(updatedPlan.planId, updatedPlan);
    if (!updatedData)
        throw new AppError_1.AppError("Update failed,no such merchant plan exist", 404);
    const { planType, planName, subType, price, benefits } = updatedData;
    return { planType, planName, subType, price, benefits };
});
exports.updateAdminPlan = updateAdminPlan;
