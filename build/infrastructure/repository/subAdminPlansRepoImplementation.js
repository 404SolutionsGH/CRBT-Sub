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
exports.SubAdminPlansRepoImp = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const SubAdminplans_1 = require("../../domain/entities/SubAdminplans");
class SubAdminPlansRepoImp {
    createSubscription(subDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const { price, planId, subscriberId } = subDetails;
            return yield SubAdminplans_1.SubAdminPlans.create({ price, planId, subscriberId });
        });
    }
    findSubscriptionsBySubscriberId(subscriberId_1) {
        return __awaiter(this, arguments, void 0, function* (subscriberId, isSubValid = null, update = false) {
            if (update) {
                const updatedData = yield SubAdminplans_1.SubAdminPlans.update({ isSubValid: false }, { where: { subscriberId, isSubValid }, returning: true });
                if (updatedData[0] === 1)
                    return updatedData[1][0];
                throw new AppError_1.AppError("User has already unsubscribed", 404);
            }
            else if (isSubValid === null)
                return yield SubAdminplans_1.SubAdminPlans.findOne({ where: { subscriberId } });
            return yield SubAdminplans_1.SubAdminPlans.findOne({ where: { subscriberId, isSubValid } });
        });
    }
    findSubscriptionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield SubAdminplans_1.SubAdminPlans.findByPk(id);
        });
    }
}
exports.SubAdminPlansRepoImp = SubAdminPlansRepoImp;
