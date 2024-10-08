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
exports.subscribeToSong = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const SubSongs_1 = require("../../domain/entities/SubSongs");
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const subSongsRepoImplementation_1 = require("../../infrastructure/repository/subSongsRepoImplementation");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const { createSubscription, findSubscriptionsBySubscriberId } = new subSongsRepoImplementation_1.SubSongsRepoImp();
const isOnSubscription = (subscriberId) => __awaiter(void 0, void 0, void 0, function* () {
    const subDetail = yield findSubscriptionsBySubscriberId(subscriberId, true);
    if (subDetail)
        return true;
    return false;
});
const subscribeToSong = (subscriberId, songId) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateSubSongId } = new userRepoImplemtation_1.UserRepoImp();
    const { findSongById, increaseNumberOfSubscribers } = new songRepoImplementaion_1.SongRepoImpl();
    if (yield isOnSubscription(subscriberId))
        throw new AppError_1.AppError("User Already on a subscription", 409);
    yield increaseNumberOfSubscribers(1, songId);
    const { price } = (yield findSongById(songId));
    yield updateSubSongId(songId, subscriberId);
    yield createSubscription(SubSongs_1.SubSongs.build({ subscriberId, price, songId }));
});
exports.subscribeToSong = subscribeToSong;
