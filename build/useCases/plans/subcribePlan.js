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
exports.subscibeToPlan = void 0;
const objects_1 = require("../../@common/constants/objects");
const date_1 = require("../../@common/helperMethods/date");
const AppError_1 = require("../../domain/entities/AppError");
const Reward_1 = require("../../domain/entities/Reward");
const SubAdminplans_1 = require("../../domain/entities/SubAdminplans");
const adminPlanRepoImplementation_1 = require("../../infrastructure/repository/adminPlanRepoImplementation");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const subAdminPlansRepoImplementation_1 = require("../../infrastructure/repository/subAdminPlansRepoImplementation");
const subscibeToPlan = (adminId, planId) => __awaiter(void 0, void 0, void 0, function* () {
    // confirm payment first(Not yet implemented)
    const { setUpPaymentData } = new adminRepoImplementation_1.AdminRepoImp();
    const { findPlanById } = new adminPlanRepoImplementation_1.AdminPlanRepoImp();
    const { createSubscription } = new subAdminPlansRepoImplementation_1.SubAdminPlansRepoImp();
    // check if the admin is already on a plan(Not yet implemented).
    const planDetails = yield findPlanById(planId);
    if (!planDetails)
        throw new AppError_1.AppError(`No plan with this id ${planId} exist`, 404);
    if (planDetails.deleteFlag)
        throw new AppError_1.AppError("Cannot subscribe to plan which is flaged for deletion", 401);
    const nextPaymentDay = (0, date_1.getNextDate)((0, date_1.getCurrentDateYYMMDD)(), planDetails.subType);
    // console.log(nextPaymentDay);
    const isPaymentInfoSetup = yield setUpPaymentData(planId, nextPaymentDay, adminId);
    if (!isPaymentInfoSetup)
        throw new AppError_1.AppError("Admin account does not exist", 404);
    // saving subscrition data
    yield createSubscription(SubAdminplans_1.SubAdminPlans.build({ price: planDetails.price, planId, subscriberId: adminId }));
    objects_1.event.emit("updateRewardPoints", Reward_1.Reward.build({ accountId: adminId, accountType: "admin" }));
});
exports.subscibeToPlan = subscibeToPlan;
