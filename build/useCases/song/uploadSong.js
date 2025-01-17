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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTempSong = exports.uploadSong = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppError_1 = require("../../domain/entities/AppError");
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const TempSong_1 = require("../../domain/entities/TempSong");
const tempSongRepoImplementation_1 = require("../../infrastructure/repository/tempSongRepoImplementation");
const helpers_1 = require("./helpers");
const adminPlanRepoImplementation_1 = require("../../infrastructure/repository/adminPlanRepoImplementation");
const file_1 = require("../../@common/helperMethods/file");
const { saveSong, findSongsByOwnersId } = new songRepoImplementaion_1.SongRepoImpl();
const { findPlanById } = new adminPlanRepoImplementation_1.AdminPlanRepoImp();
const { createTempSongs, findByTuneAndDelete } = new tempSongRepoImplementation_1.TempSongRepoImpl();
const checkSongNumberLimitation = (ownerId, planId) => __awaiter(void 0, void 0, void 0, function* () {
    const allSongsUploadedByOwner = yield findSongsByOwnersId(ownerId);
    const { benefits } = (yield findPlanById(planId));
    if (allSongsUploadedByOwner.length === benefits.songLimit)
        throw new AppError_1.AppError("The number of songs uploads for current plan has been reached please upgrade your plan to increase your number of uploads", 401);
});
const checkTempSongLimit = (numberOfSongsToUpload, planId) => __awaiter(void 0, void 0, void 0, function* () {
    const { benefits } = (yield findPlanById(planId));
    const numOfSongsAllowedPerUpload = benefits.numberOfSongsPerUpload;
    if (numberOfSongsToUpload > numOfSongsAllowedPerUpload)
        throw new AppError_1.AppError(`Your current plan only allows you to upload ${numOfSongsAllowedPerUpload} per upload`, 401);
});
const uploadSong = (songInfo, song, proFile) => __awaiter(void 0, void 0, void 0, function* () {
    //   check if the account is an admin
    const accountInfo = yield (0, helpers_1.isUserAdmin)(songInfo.ownerId);
    if (accountInfo.adminType === "merchant" && accountInfo.planId === 0)
        throw new AppError_1.AppError("This account is not on a plan.Please subscribe to a plan to upload", 401);
    // check limations on upload base on the plan the Admin is on using the planId
    if (accountInfo.planId !== 0)
        yield checkSongNumberLimitation(songInfo.ownerId, accountInfo.planId);
    if (!songInfo.tune) {
        songInfo.tune = `${process.env.BaseUrl}/api/v1/songs/listen/${(yield (0, file_1.createFileNameAndSave)(song))}`;
    }
    else {
        // delete temp upload data from database
        yield findByTuneAndDelete(songInfo.tune);
    }
    songInfo.profile = `${process.env.BaseUrl}/api/v1/songs/profile/${(yield (0, file_1.createFileNameAndSave)(proFile))}`;
    // console.log(songInfo.tune)
    //   save the data in the data base
    yield saveSong(songInfo);
});
exports.uploadSong = uploadSong;
const uploadTempSong = (ownerId, allSongs) => __awaiter(void 0, void 0, void 0, function* () {
    const songsData = [];
    const { planId, adminType } = yield (0, helpers_1.isUserAdmin)(ownerId);
    for (let file of allSongs) {
        const tempSongInfo = TempSong_1.TempSong.build({ ownerId, tune: `${process.env.BaseUrl}/api/v1/songs/listen/${(yield (0, file_1.createFileNameAndSave)(file))}`, originalName: file.originalName });
        songsData.push(tempSongInfo);
    }
    if (adminType === "merchant" && planId === 0)
        throw new AppError_1.AppError("This account is not on a plan.Please subscribe to a plan to upload", 401);
    if (planId !== 0)
        yield checkTempSongLimit(allSongs.length, planId);
    // console.log(`ownerId=${songsData[0].ownerId} ${songsData[1].ownerId} ${songsData[2].ownerId} ${songsData[3].ownerId}`);
    yield createTempSongs(songsData);
});
exports.uploadTempSong = uploadTempSong;
