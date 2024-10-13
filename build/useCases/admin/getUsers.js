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
exports.getSubUsers = exports.getAllUsers = void 0;
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const subSongsRepoImplementation_1 = require("../../infrastructure/repository/subSongsRepoImplementation");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { getUsers } = new userRepoImplemtation_1.UserRepoImp();
    return yield getUsers();
});
exports.getAllUsers = getAllUsers;
const getSubUsers = (adminId, type) => __awaiter(void 0, void 0, void 0, function* () {
    const { findSongsByOwnersId } = new songRepoImplementaion_1.SongRepoImpl();
    const { findSubscriptionBySongIds } = new subSongsRepoImplementation_1.SubSongsRepoImp();
    const songs = yield findSongsByOwnersId(adminId);
    if (songs.length === 0)
        return [];
    const songIds = [];
    songs.forEach((song) => {
        songIds.push(song.id);
    });
    return yield findSubscriptionBySongIds(songIds, type);
});
exports.getSubUsers = getSubUsers;
