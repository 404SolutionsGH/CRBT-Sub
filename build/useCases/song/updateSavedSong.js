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
exports.updateSavedSong = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppError_1 = require("../../domain/entities/AppError");
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const objects_1 = require("../../@common/constants/objects");
const file_1 = require("../../@common/helperMethods/file");
const updateSavedSong = (songInfo, newSong, newProfile) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateSongInfo } = new songRepoImplementaion_1.SongRepoImpl();
    if (newSong) {
        const fileName = (0, file_1.extractFileName)(songInfo.tune);
        if (!fileName)
            throw new AppError_1.AppError("The value passed for tune should be a link", 400);
        objects_1.event.emit("deleteFile", fileName);
        songInfo.tune = `${process.env.BaseUrl}/api/v1/songs/listen/${yield (0, file_1.createFileNameAndSave)(newSong)}`;
    }
    if (newProfile) {
        const fileName = (0, file_1.extractFileName)(songInfo.profile);
        if (!fileName)
            throw new AppError_1.AppError("The value passed for profile should be a link", 400);
        objects_1.event.emit("deleteFile", fileName);
        songInfo.profile = `${process.env.BaseUrl}/api/v1/songs/profile/${yield (0, file_1.createFileNameAndSave)(newProfile)}`;
    }
    const updatedSong = yield updateSongInfo(songInfo);
    if (!updatedSong)
        throw new AppError_1.AppError("Could not updated,no such song exist", 404);
});
exports.updateSavedSong = updateSavedSong;
