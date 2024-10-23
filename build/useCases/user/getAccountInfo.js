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
exports.getAccountInfo = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const getAccountInfo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepo = new userRepoImplemtation_1.UserRepoImp();
    const { findSongById } = new songRepoImplementaion_1.SongRepoImpl();
    const accountInfo = yield userRepo.findUserById(id);
    if (!accountInfo)
        throw new AppError_1.AppError("Acount Info not retrieved,Account does not exist", 404);
    const { firstName, lastName, accountBalance, phone, langPref, subSongId } = accountInfo;
    let subSongDetails = null;
    if (subSongId !== 0) {
        const { artisteName, songTitle, subscriptionType, price, profile } = (yield findSongById(subSongId));
        subSongDetails = { artisteName, songTitle, subscriptionType, price, profile };
    }
    return { firstName, lastName, accountBalance, phone, langPref, subSongDetails };
});
exports.getAccountInfo = getAccountInfo;
