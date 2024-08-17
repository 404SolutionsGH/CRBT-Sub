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
exports.allSongsController = exports.toneDeletionController = exports.toneController = exports.recommendationController = exports.songSubDetailController = exports.searchController = exports.listenController = exports.profileController = exports.uploadController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const accountSchema_1 = require("../../schema/accountSchema");
const mongoose_1 = require("../../libs/mongoose");
const mongoose_2 = require("mongoose");
const songSchema_1 = require("../../schema/songSchema");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const crbtServiceSchema_1 = require("../../schema/crbtServiceSchema");
const mongoose_3 = require("mongoose");
const promises_2 = __importStar(require("fs/promises"));
const albumSchema_1 = require("../../schema/albumSchema");
// helper methods
const checkPathExists = (path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, promises_2.access)(path, promises_2.default.constants.F_OK);
        console.log("Path exists.");
        return true;
    }
    catch (err) {
        console.log("Path does not exist.");
        return false;
    }
});
exports.uploadController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // profile(img file) and song(mp3 file) are set up by a middleware called setImgAndMp3Files
    const { id, albumName, songTitle, artisteName, profile, song, lang, ussdCode, subscriptionType, price, category } = req.body;
    console.log("Uploading a song...");
    console.log("Checking if account is of the appropriate type...");
    const accountInfo = yield accountSchema_1.AccountSchema.findOne({ _id: (0, mongoose_1.tObjectId)(id) }).populate("service");
    if (accountInfo && (accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.accountType) !== "norm" && songTitle && artisteName && ussdCode && subscriptionType && price && category) {
        console.log("Checking account songs limit...");
        if (!(accountInfo.service instanceof mongoose_2.Schema.Types.ObjectId) &&
            accountInfo.service.songs.length <=
                Number(accountInfo.service.planType === "basic"
                    ? process.env.basicServiceSongsLimit
                    : accountInfo.service.planType === "silver"
                        ? process.env.silverServiceSongsLimit
                        : process.env.goldServiceSongsLimit)) {
            console.log("Songs limit not reached,upload can proceed");
            console.log("Checking if songs with this title already exist...");
            if ((yield songSchema_1.SongSchema.find({ subServiceId: accountInfo.service._id, songTitle, artisteName })).length !== 0) {
                console.log("A song with this title has already been uploaded");
                throw new Error("Song has already been uploaded");
            }
            console.log("Song does not exist in database");
            console.log("Saving info about song...");
            console.log("Generating songId...");
            const songId = new mongoose_3.Types.ObjectId();
            const songDataSaved = yield songSchema_1.SongSchema.create({
                _id: songId,
                songTitle,
                artisteName,
                price,
                category,
                lang: lang ? lang : "eng",
                subServiceId: accountInfo.service._id,
                albumName: albumName ? albumName : "N/A",
                ussdCode,
                subscriptionType,
                profile: profile ? `/${String(songId)}${profile.exetension}` : "/defaultProf.png",
                song: `/${String(songId)}${song.exetension}`,
            });
            console.log("Song Info saved sucessfully");
            console.log("Checking if there is an albumName and if it already exist..");
            if (albumName && !(yield albumSchema_1.AlbumSchema.findOne({ name: albumName }))) {
                console.log("Album does not exist, creating album ..");
                yield albumSchema_1.AlbumSchema.create({ name: albumName, artisteName, numOfSongs: 1, profile: profile ? `/${String(songId)}${profile.exetension}` : "/defaultProf.png" });
            }
            else {
                console.log(!albumName ? "No data in albumName in request body" : "An album with this name exist");
                if (albumName) {
                    yield albumSchema_1.AlbumSchema.updateOne({ name: albumName }, { $inc: { numOfSongs: 1 } });
                }
            }
            // Saving song's profile image and mp3 file using the ObjectId of it saved info
            console.log("Saving song profile image and mp3 files");
            if (profile) {
                // checking if the profile was set(this is because is not compulsory to upload an image when uploading a sond)
                yield (0, promises_1.writeFile)((0, path_1.resolve)(__dirname, `./songsData/songsProfileImages/${songDataSaved._id}${profile.exetension}`), profile.data);
            }
            yield (0, promises_1.writeFile)((0, path_1.resolve)(__dirname, `./songsData/songs/${songDataSaved._id}${song.exetension}`), song.data);
            console.log("Files sucessfully saved..");
            console.log("Updating this account's crbt service document by adding the saved song's id....");
            yield crbtServiceSchema_1.CrbtServiceSchema.findOneAndUpdate({ _id: accountInfo.service._id }, { $push: { songs: { $each: [songDataSaved._id], $position: 0 } } });
            console.log("Update done");
            res.status(200).json({ message: "Song saved successfully" });
        }
        else {
            console.log("Songs upload limit reached");
            throw new Error("Songs upload limit reached");
        }
    }
    else {
        if (!songTitle || !artisteName || !ussdCode || !subscriptionType) {
            res.status(400);
            throw new Error("Song upload failed ,Invalid request body");
        }
        res.status(401);
        throw new Error(!(accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.service) ? "Do not have an CRBT service to upload songs to" : "This account type is not authorized to upload a song");
    }
}));
exports.profileController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("An img is been retrieved....");
    const { fileName } = req.params;
    console.log("Creating file path....");
    const pathToFile = (0, path_1.resolve)(__dirname, `./songsData/songsProfileImages/${fileName}`);
    console.log("File path created");
    console.log("Checking if file path exist....");
    if (yield checkPathExists(pathToFile)) {
        res.status(200);
        res.download(pathToFile);
    }
    else {
        res.status(200);
        res.download((0, path_1.resolve)(__dirname, "./songsData/songsProfileImages/brokenProf.png"));
    }
}));
exports.listenController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("A song is been retrieved....");
    const { fileName } = req.params;
    console.log("Creating file path....");
    const pathToFile = (0, path_1.resolve)(__dirname, `./songsData/songs/${fileName}`);
    console.log("File path created");
    console.log("Checking if file path exist....");
    if (yield checkPathExists(pathToFile)) {
        console.log("Updating numberOfListeners of songInfo...");
        yield songSchema_1.SongSchema.findOneAndUpdate({ _id: (0, mongoose_1.tObjectId)(fileName.split(".")[0]) }, { $inc: { numberOfListeners: 1 } });
        console.log("Update done");
        res.status(200);
        res.download(pathToFile);
    }
    else {
        res.status(404);
        throw new Error("No song file with this id exist");
    }
}));
exports.searchController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("A search is been done...");
    const { songTitle, artisteName, lang, albumName, category } = req.query;
    if (songTitle || lang || artisteName || albumName || category) {
        const fieldsToExclude = "-__v -date -numberOfListeners -lang -numberOfSubscribers -subServiceId -albumName -ussdCode -subscriptionType";
        const results = songTitle && lang
            ? yield songSchema_1.SongSchema.find({ songTitle: { $regex: songTitle, $options: "i" }, lang }).select(fieldsToExclude)
            : artisteName && lang
                ? yield songSchema_1.SongSchema.find({ artisteName: { $regex: artisteName, $options: "i" }, lang }).select(fieldsToExclude)
                : albumName && lang
                    ? yield songSchema_1.SongSchema.find({ albumName: { $regex: albumName, $options: "i" }, lang }).select(fieldsToExclude)
                    : category && lang
                        ? yield songSchema_1.SongSchema.find({ category: { $regex: category, $options: "i" }, lang }).select(fieldsToExclude)
                        : songTitle
                            ? yield songSchema_1.SongSchema.find({ songTitle: { $regex: songTitle, $options: "i" } }).select(fieldsToExclude)
                            : artisteName
                                ? yield songSchema_1.SongSchema.find({ artisteName: { $regex: artisteName, $options: "i" } }).select(fieldsToExclude)
                                : albumName
                                    ? yield songSchema_1.SongSchema.find({ albumName: { $regex: albumName, $options: "i" } }).select(fieldsToExclude)
                                    : category
                                        ? yield songSchema_1.SongSchema.find({ category: { $regex: category, $options: "i" } }).select(fieldsToExclude)
                                        : yield songSchema_1.SongSchema.find({ lang }).select(fieldsToExclude);
        console.log("Search complete");
        res.status(200).json({ results, numOfSongs: results.length });
    }
    else {
        res.status(400);
        throw new Error("Invalid request body:No songTitle passed");
    }
}));
exports.songSubDetailController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { songId } = req.query;
    console.log("Getting subscrition details about a song...");
    if (songId && typeof songId === "string") {
        const songDetails = yield songSchema_1.SongSchema.findOne({ _id: (0, mongoose_1.tObjectId)(songId) }).populate("subServiceId");
        if (songDetails && !(songDetails.subServiceId instanceof mongoose_2.Schema.Types.ObjectId)) {
            // setting up the json obj to be sent
            console.log("Details Retrieved");
            const detailToSend = {
                subName: songDetails.subServiceId.serviceName,
                category: songDetails.category,
                price: songDetails.price,
                currency: "ETB",
                billing: songDetails.subscriptionType,
                ussdCode: songDetails.ussdCode,
                _id: songDetails._id,
            };
            res.status(200).json(detailToSend);
        }
        else {
            res.status(404);
            throw new Error("No song with this id exist");
        }
    }
    else {
        res.status(400);
        throw new Error("Invalid request body, no data passed for songId");
    }
}));
exports.recommendationController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Songs are recommended to users base on a users language preference and the songs with the higest subscribers
    console.log("Getting recommendation...");
    const { id } = req.body;
    const { flag } = req.query;
    const fieldsToExclude = "-__v -date -numberOfListeners -lang -numberOfSubscribers -subServiceId -albumName -ussdCode -subscriptionType";
    // gettting  the language preference of client
    console.log("Getting user lang Pref...");
    const accountInfo = yield accountSchema_1.AccountSchema.findById(id).select("langPref");
    console.log("Language Pref retrieved");
    if (accountInfo) {
        const { langPref } = accountInfo;
        if (flag) {
            console.log("Recommendation been retrieved for albums...");
            const albumRecom = yield albumSchema_1.AlbumSchema.find({}).sort({ numberOfSubscribers: -1 }).select("-_id -__v ");
            res.status(200).json({ results: albumRecom, numOfResults: albumRecom.length });
        }
        else {
            console.log("Recommendation been retrieved is for songs...");
            const songRecom = yield songSchema_1.SongSchema.find({ lang: langPref }).sort({ numberOfSubscribers: -1 }).select(fieldsToExclude);
            res.status(200).json({ results: songRecom, numOfResults: songRecom.length });
        }
    }
}));
exports.toneController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fieldsToExclude = "-__v -date -numberOfListeners -lang -numberOfSubscribers -subServiceId  -ussdCode -subscriptionType";
    const toneInfo = yield songSchema_1.SongSchema.findById(id).select(fieldsToExclude);
    // toneInfo returns null if no song with the id in params exist
    if (!toneInfo) {
        res.status(404);
        throw new Error("No tune with such id exists");
    }
    res.status(200).json({ tone: toneInfo });
}));
exports.toneDeletionController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("A tone is been deleted");
    const { id } = req.params;
    console.log("Checking if user ia authorized to delete tone");
    const accountInfo = yield accountSchema_1.AccountSchema.findOne({ _id: (0, mongoose_1.tObjectId)(req.body.id) });
    if (accountInfo && (accountInfo.accountType === "admin" || accountInfo.accountType === "superAdmin")) {
        const deletedTone = yield songSchema_1.SongSchema.findOneAndDelete({ _id: (0, mongoose_1.tObjectId)(id) });
        if (deletedTone) {
            res.status(200).json({ message: `Tone with title ${deletedTone.songTitle} has been sucessfully deleted` });
        }
        else {
            throw new Error("Delete action Failed,no tone with this id exist");
        }
    }
}));
exports.allSongsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Getting All Songs..");
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page
    const skip = (page - 1) * limit;
    const results = yield songSchema_1.SongSchema.find({}).skip(skip).limit(limit);
    const total = yield songSchema_1.SongSchema.countDocuments({});
    res.status(200).json({
        results,
        pagination: {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        },
    });
}));
