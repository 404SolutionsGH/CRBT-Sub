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
exports.uploadController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const accountSchema_1 = require("../../schema/accountSchema");
const mongoose_1 = require("../../libs/mongoose");
const mongoose_2 = require("mongoose");
const songSchema_1 = require("../../schema/songSchema");
const promises_1 = require("fs/promises");
exports.uploadController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // profile(img file) and song(mp3 file) are set up by a middleware called setImgAndMp3Files
    const { id, albumName, songTitle, artisteName, profile, song, lang } = req.body;
    console.log("Uploading a song...");
    console.log("Checking if account is of the appropriate type...");
    const accountInfo = yield accountSchema_1.AccountSchema.findOne({ _id: (0, mongoose_1.tObjectId)(id) }).populate("service");
    if (accountInfo && (accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.accountType) !== "norm" && songTitle && artisteName) {
        console.log("Checking account songs limit...");
        if (!(accountInfo.service instanceof mongoose_2.Schema.Types.ObjectId) &&
            accountInfo.service.songs.length <=
                Number(accountInfo.service.planType === "basic"
                    ? process.env.basicServiceSongsLimit
                    : accountInfo.service.planType === "silver"
                        ? process.env.silverServiceSongsLimit
                        : process.env.goldServiceSongsLimit)) {
            console.log("Songs limit not reached,upload can proceed");
            console.log("Saving info about song...");
            const songDataSaved = yield songSchema_1.SongSchema.create({ songTitle, artisteName, lang: lang ? lang : "eng", subServiceId: accountInfo.service._id, albumName: albumName ? albumName : "N/A" });
            console.log("Song Info saved sucessfully");
            // Saving song's profile image and mp3 file using the ObjectId of it saved info
            console.log("Saving song profile image and mp3 files");
            if (profile) {
                // checking if the profile was set(this is because is not compulsory to upload an image when uploading a sond)
                yield (0, promises_1.writeFile)(`../../../songsData/songsProfileImages/${songDataSaved._id}.${profile.exetension}`, profile.data);
            }
            yield (0, promises_1.writeFile)(`../../../songsData/songs/${songDataSaved._id}.${song.exetension}`, song.data);
            console.log("Files sucessfully saved..");
            console.log("Updating profile and song section of song info with saved info ObjectId...");
            yield songSchema_1.SongSchema.updateOne({ _id: songDataSaved._id }, { $set: { profile: profile ? `/${String(songDataSaved._id)}` : "/defaultProf.png", song: `/${String(songDataSaved._id)}` } });
            res.status(200).json({ message: "Song saved successfully" });
        }
        else {
            console.log("Songs upload limit reached");
            throw new Error("Songs upload limit reached");
        }
    }
    else {
        if (!songTitle || !artisteName) {
            res.status(400);
            throw new Error("Song upload failed ,Invalid request body");
        }
        res.status(401);
        throw new Error(!(accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.service) ? "Do not have an CRBT service to upload songs to" : "This account type is not authorized to upload a song");
    }
}));