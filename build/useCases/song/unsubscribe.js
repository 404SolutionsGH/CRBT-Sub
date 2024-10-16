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
exports.unsubscribe = void 0;
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const subSongsRepoImplementation_1 = require("../../infrastructure/repository/subSongsRepoImplementation");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const unsubscribe = (subscriberId) => __awaiter(void 0, void 0, void 0, function* () {
    const { findSubscriptionsBySubscriberId } = new subSongsRepoImplementation_1.SubSongsRepoImp();
    const { updateSubSongId, findUserById } = new userRepoImplemtation_1.UserRepoImp();
    const { increaseNumberOfSubscribers } = new songRepoImplementaion_1.SongRepoImpl();
    const { subSongId } = (yield findUserById(subscriberId));
    yield increaseNumberOfSubscribers(1, subSongId, 'dec');
    yield updateSubSongId(0, subscriberId);
    yield findSubscriptionsBySubscriberId(subscriberId, true, true);
});
exports.unsubscribe = unsubscribe;
