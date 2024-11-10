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
exports.RewardRepoImpl = void 0;
const Reward_1 = require("../../domain/entities/Reward");
class RewardRepoImpl {
    get(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Reward_1.Reward.findOne({ where: { accountId } });
        });
    }
    createOrUpdate(rewardData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountId, accountType, points, email, phone } = rewardData;
            yield Reward_1.Reward.upsert({ accountId, accountType, points, email, phone });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Reward_1.Reward.findAll();
        });
    }
}
exports.RewardRepoImpl = RewardRepoImpl;
