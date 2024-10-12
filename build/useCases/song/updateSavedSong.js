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
exports.updateSavedSong = void 0;
const path_1 = require("path");
const AppError_1 = require("../../domain/entities/AppError");
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const path_2 = require("../../@common/helperMethods/path");
const objects_1 = require("../../@common/constants/objects");
const updateFiles = (data) => __awaiter(void 0, void 0, void 0, function* () {
    for (let file of data) {
        const { fileName, content } = file;
        const path = (0, path_1.join)(__dirname, "..", "..", "..", "/songsData", fileName);
        if (yield (0, path_2.checkPathExists)(path)) {
            objects_1.event.emit("saveFile", content, path);
        }
        else {
            throw new AppError_1.AppError("The song or profile File you are trying to update does not exist.", 404);
        }
    }
});
const extractFileName = (url) => {
    const pattern = /^https?:\/\/[^\/]+\/api\/v1\/songs\/(listen|profile)\/([^\/]+)$/;
    const match = url.match(pattern);
    if (match) {
        return match[2];
    }
    return null;
};
const updateSavedSong = (songInfo, newSong, newProfile) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateSongInfo } = new songRepoImplementaion_1.SongRepoImpl();
    const allFilesData = [];
    if (newSong) {
        const fileName = extractFileName(songInfo.tune);
        if (!fileName)
            throw new AppError_1.AppError("The value passed for tune should be a link", 400);
        allFilesData.push({ content: newSong, fileName });
    }
    if (newProfile) {
        const fileName = extractFileName(songInfo.profile);
        if (!fileName)
            throw new AppError_1.AppError("The value passed for profile should be a link", 400);
        allFilesData.push({ content: newProfile, fileName });
    }
    yield updateFiles(allFilesData);
    const updatedSong = yield updateSongInfo(songInfo);
    if (!updatedSong)
        throw new AppError_1.AppError("Could not updated,no such song exist", 404);
});
exports.updateSavedSong = updateSavedSong;
