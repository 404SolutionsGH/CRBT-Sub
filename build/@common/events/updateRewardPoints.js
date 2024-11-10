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
exports.updateRewardPointsListener = void 0;
const Reward_1 = require("../../domain/entities/Reward");
const adminRepoImplementation_1 = require("../../infrastructure/repository/adminRepoImplementation");
const rewardRepoImplementation_1 = require("../../infrastructure/repository/rewardRepoImplementation");
const systemRepoImplementation_1 = require("../../infrastructure/repository/systemRepoImplementation");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const objects_1 = require("../constants/objects");
const updateRewardPointsListener = () => {
    objects_1.event.on("updateRewardPoints", (rewardData) => __awaiter(void 0, void 0, void 0, function* () {
        let email = "";
        let phone = "";
        const { accountId, accountType } = rewardData;
        const { get, createOrUpdate } = new rewardRepoImplementation_1.RewardRepoImpl();
        const { getSysInfo } = new systemRepoImplementation_1.SystemRepoImpl();
        const { findAdminById } = new adminRepoImplementation_1.AdminRepoImp();
        const { findUserById } = new userRepoImplemtation_1.UserRepoImp();
        const { pointsToReward } = yield getSysInfo();
        console.log("Updating a users reward points..");
        const prevRewardData = yield get(rewardData.accountId);
        if (!prevRewardData) {
            email = accountType === "admin" ? (yield findAdminById(accountId)).email : undefined;
            phone = accountType === "user" ? (yield findUserById(accountId)).phone : undefined;
        }
        else {
            email = prevRewardData.email;
            phone = prevRewardData.phone;
        }
        yield createOrUpdate(Reward_1.Reward.build({ accountId, email, phone, accountType, points: prevRewardData ? prevRewardData.points + pointsToReward : pointsToReward }));
        console.log("Points added");
    }));
};
exports.updateRewardPointsListener = updateRewardPointsListener;
