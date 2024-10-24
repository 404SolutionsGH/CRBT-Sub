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
exports.AdminPlanRepoImp = void 0;
const AdminPlan_1 = require("../../domain/entities/AdminPlan");
class AdminPlanRepoImp {
    createPlan(plan) {
        return __awaiter(this, void 0, void 0, function* () {
            const { planType, subType, price, benefits } = plan;
            const [itemCreated, isCreated] = yield AdminPlan_1.AdminPlan.findOrCreate({ where: { subType, planType }, defaults: { planType, subType, price, benefits } });
            if (isCreated)
                return itemCreated;
            return null;
        });
    }
    getAllPlans() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminPlan_1.AdminPlan.findAll({ where: { deleteFlag: false } });
        });
    }
    findPlanById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdminPlan_1.AdminPlan.findByPk(id);
        });
    }
    deletPlanById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const numDeleted = yield AdminPlan_1.AdminPlan.destroy({ where: { planId: id } });
            if (numDeleted === 1)
                return true;
            return false;
        });
    }
    flagPlanForDeletion(planId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [numRows] = yield AdminPlan_1.AdminPlan.update({ deleteFlag: true }, { where: { planId } });
            if (numRows === 1)
                return true;
            return false;
        });
    }
    updatePlanById(id, updatedPlan) {
        return __awaiter(this, void 0, void 0, function* () {
            const { planType, planName, subType, price, benefits } = updatedPlan;
            const [numRows, affectedRows] = yield AdminPlan_1.AdminPlan.update({ planType, planName, subType, price, benefits }, { where: { planId: id }, returning: true });
            if (numRows === 1)
                return affectedRows[0];
            return null;
        });
    }
}
exports.AdminPlanRepoImp = AdminPlanRepoImp;
