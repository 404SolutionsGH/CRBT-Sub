"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const serviceRepoImplementation_1 = require("../../infrastructure/repository/serviceRepoImplementation");
const songRepoImplementaion_1 = require("../../infrastructure/repository/songRepoImplementaion");
const randomData_1 = require("../../@common/helperMethods/randomData");
const promises_1 = __importStar(require("fs/promises"));
const objects_1 = require("../../@common/constants/objects");
const TempSong_1 = require("../../domain/entities/TempSong");
const tempSongRepoImplementation_1 = require("../../infrastructure/repository/tempSongRepoImplementation");
const helpers_1 = require("./helpers");
const isMerchantOnPlan = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { findServiceById } = new serviceRepoImplementation_1.ServiceRepoImp();
    const serviceInfo = yield findServiceById(id);
    if (!serviceInfo)
        throw new AppError_1.AppError("This Account does not have a service, please contact system Adimns to get one", 404);
});
const checkPathExists = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, promises_1.access)(path, promises_1.default.constants.F_OK);
        console.log("Path exists.");
        return true;
    }
    catch (err) {
        console.log("Path does not exist.");
        return false;
    }
});
const createFileNameAndSave = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const { getRandomString } = new randomData_1.RandomData();
    const isNameUnique = false;
    let fileName;
    while (!isNameUnique) {
        fileName = `${getRandomString(20)}${file.exetension}`;
        const path = `${__dirname.replace("\\build\\useCases\\song", `\\songsData\\${fileName}`)}`;
        // check if the file exist
        if (!(yield checkPathExists(path))) {
            // emit the File path and buffer for storage
            objects_1.event.emit("saveFile", file.data, path);
            return fileName;
        }
    }
});
const uploadSong = (songInfo, song, proFile) => __awaiter(void 0, void 0, void 0, function* () {
    const { saveSong } = new songRepoImplementaion_1.SongRepoImpl();
    //   check if the account is an admin
    const accountInfo = yield (0, helpers_1.isUserAdmin)(songInfo.ownerId);
    if (accountInfo.adminType === "merchant" && accountInfo.planId === 0)
        throw new AppError_1.AppError("This account is not on a plan.Please subscribe to a plan to upload", 401);
    // check limations on upload base on the plan the Admin is on using the planId(Not implemented.)
    if (!songInfo.tune) {
        songInfo.tune = `${process.env.BaseUrl}/api/v1/listen/${(yield createFileNameAndSave(song))}`;
    }
    songInfo.profile = `${process.env.BaseUrl}/api/v1/profile/${(yield createFileNameAndSave(proFile))}`;
    // console.log(songInfo.tune)
    //   save the data in the data base
    yield saveSong(songInfo);
});
exports.uploadSong = uploadSong;
const uploadTempSong = (ownerId, allSongs) => __awaiter(void 0, void 0, void 0, function* () {
    const { createTempSongs } = new tempSongRepoImplementation_1.TempSongRepoImpl();
    const songsData = [];
    for (let file of allSongs) {
        const tempSongInfo = TempSong_1.TempSong.build({ ownerId, tune: `${process.env.BaseUrl}/api/v1/listen/${(yield createFileNameAndSave(file))}` });
        songsData.push(tempSongInfo);
    }
    // console.log(`ownerId=${songsData[0].ownerId} ${songsData[1].ownerId} ${songsData[2].ownerId} ${songsData[3].ownerId}`);
    yield createTempSongs(songsData);
});
exports.uploadTempSong = uploadTempSong;
