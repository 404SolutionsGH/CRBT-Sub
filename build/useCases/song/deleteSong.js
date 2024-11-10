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
exports.deleteTempSong = exports.deleteSavedSong = void 0;
const objects_1 = require("../../@common/constants/objects");
const file_1 = require("../../@common/helperMethods/file");
const AppError_1 = require("../../domain/entities/AppError");
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const tempSongRepoImplementation_1 = require("../../infrastructure/repository/tempSongRepoImplementation");
const userRepoImplemtation_1 = require("../../infrastructure/repository/userRepoImplemtation");
const { findSongById, deleteSongById, flagSongForDeletion } = new songRepoImplementaion_1.SongRepoImpl();
const { deleteSong, findTempSongById } = new tempSongRepoImplementation_1.TempSongRepoImpl();
const canAdminDeleteSong = (songId_1, adminId_1, ...args_1) => __awaiter(void 0, [songId_1, adminId_1, ...args_1], void 0, function* (songId, adminId, flag = "saved") {
    let songDetail;
    if (flag === "saved")
        songDetail = yield findSongById(songId, true);
    else
        songDetail = yield findTempSongById(songId);
    if (!songDetail)
        throw new AppError_1.AppError("Song Deletion failed,no such song exists", 404);
    //Delete the actual song files and profile 
    objects_1.event.emit("deleteFile", (0, file_1.extractFileName)(songDetail.tune));
    if (flag === "saved")
        objects_1.event.emit("deleteFile", (0, file_1.extractFileName)(songDetail.profile));
});
const deleteSavedSong = (songId, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const { getAllUserBySubSongId } = new userRepoImplemtation_1.UserRepoImp();
    const allUserSubOnSong = yield getAllUserBySubSongId(songId);
    if (allUserSubOnSong.length !== 0) {
        // flag the song for deletion
        yield flagSongForDeletion(songId);
        throw new AppError_1.AppError("Song deletion failed,but has been flag for automatic deletion later when no one is on it", 409);
    }
    yield canAdminDeleteSong(songId, adminId);
    yield deleteSongById(songId);
});
exports.deleteSavedSong = deleteSavedSong;
const deleteTempSong = (songId, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    yield canAdminDeleteSong(songId, adminId, "temp");
    yield deleteSong(songId);
});
exports.deleteTempSong = deleteTempSong;
