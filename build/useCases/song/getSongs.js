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
exports.getAllSongs = exports.getSavedUploads = exports.getTempUploads = void 0;
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const tempSongRepoImplementation_1 = require("../../infrastructure/repository/tempSongRepoImplementation");
const helpers_1 = require("./helpers");
const getTempUploads = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const accountInfo = yield (0, helpers_1.isUserAdmin)(ownerId);
    const { findTempSongsByOwnersId } = new tempSongRepoImplementation_1.TempSongRepoImpl();
    return yield findTempSongsByOwnersId(ownerId, accountInfo.adminType === "system");
});
exports.getTempUploads = getTempUploads;
const getSavedUploads = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const accountInfo = yield (0, helpers_1.isUserAdmin)(ownerId);
    const { findSongsByOwnersId } = new songRepoImplementaion_1.SongRepoImpl();
    return yield findSongsByOwnersId(ownerId, accountInfo.adminType === "system");
});
exports.getSavedUploads = getSavedUploads;
const getAllSongs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const {adminType} = await isUserAdmin(id);
    // if(adminType!=="system")throw new AppError("This account is not authorized to get all songs in the system",401)
    const { getAllSongs } = new songRepoImplementaion_1.SongRepoImpl();
    return yield getAllSongs();
});
exports.getAllSongs = getAllSongs;
