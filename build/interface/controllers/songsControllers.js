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
exports.searchController = exports.songController = exports.unsubcribeController = exports.subcribeController = exports.listenController = exports.profileController = exports.getAllSongsController = exports.getUploadedSongsController = exports.tempUploadController = exports.updateSavedSongController = exports.uploadController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const uploadSong_1 = require("../../useCases/song/uploadSong");
const Song_1 = require("../../domain/entities/Song");
const AppError_1 = require("../../domain/entities/AppError");
const getSongs_1 = require("../../useCases/song/getSongs");
const subscribe_1 = require("../../useCases/song/subscribe");
const unsubscribe_1 = require("../../useCases/song/unsubscribe");
const listen_1 = require("../../useCases/song/listen");
const updateSavedSong_1 = require("../../useCases/song/updateSavedSong");
const isStringNumber_1 = require("../../@common/helperMethods/isStringNumber");
const getSong_1 = require("../../useCases/song/getSong");
exports.uploadController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   // profile(img file) and song(mp3 file) are set up by a middleware called setImgAndMp3Files
    const { id, albumName, songTitle, artisteName, profile, song, lang, ussdCode, tune, subscriptionType, price, category } = req.body;
    if (!songTitle || !lang || !subscriptionType)
        throw new AppError_1.AppError(`No data passed for ${!songTitle ? "songTitle" : !lang ? "lang" : "subscriptionType"}`, 400);
    yield (0, uploadSong_1.uploadSong)(Song_1.Song.build({ ownerId: id, albumName, songTitle, artisteName, ussdCode, subscriptionType, price, category, lang, tune }), song, profile);
    res.status(201).json({ message: "Song uploaded sucessfully" });
}));
exports.updateSavedSongController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Updating Saved Song");
    const { id, albumName, songTitle, artisteName, profile, lang, ussdCode, tune, subscriptionType, price, category } = req.body;
    let newSong;
    let newProfile;
    if (!Array.isArray(req.files) && req.files !== undefined) {
        if (req.files.newSong) {
            console.log("New Song File present");
            newSong = req.files.newSong[0].buffer;
        }
        if (req.files.newProfile) {
            console.log("New Profile File present");
            newProfile = req.files.newProfile[0].buffer;
        }
        else {
            throw new AppError_1.AppError("The field names for uploading files should either be profile(for images) or song(for tunes)", 400);
        }
    }
    if (!id)
        throw new AppError_1.AppError("No data passed for id in the updatedSongData object in request body", 400);
    yield (0, updateSavedSong_1.updateSavedSong)(Song_1.Song.build({ id, albumName, songTitle, artisteName, profile, lang, ussdCode, tune, subscriptionType, price, category, ownerId: req.body.id }), newSong, newProfile);
    res.status(201).json({ message: "Song updated sucessfully" });
}));
exports.tempUploadController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, songs } = req.body;
    yield (0, uploadSong_1.uploadTempSong)(id, songs);
    res.status(201).json({ message: `All ${songs.length} songs have been uploaded sucessfully` });
}));
exports.getUploadedSongsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.params;
    const { id } = req.body;
    let songs;
    if (state === "saved") {
        songs = yield (0, getSongs_1.getSavedUploads)(id);
    }
    else if (state === "temp") {
        songs = yield (0, getSongs_1.getTempUploads)(id);
    }
    else {
        throw new AppError_1.AppError("The parameter state should have a value saved or temp", 400);
    }
    res.status(200).json({ songs });
}));
exports.getAllSongsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const allSongs = yield (0, getSongs_1.getAllSongs)(id);
    res.status(200).json({ allSongs });
}));
exports.profileController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("An img is been retrieved....");
    const { path } = req.body;
    res.status(200).download(path);
}));
exports.listenController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("A song is been retrieved....");
    const { path } = req.body;
    yield (0, listen_1.listen)(req.url);
    res.status(200).download(path);
}));
exports.subcribeController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { songId } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(songId, "songId");
    if (!songId)
        throw new AppError_1.AppError("No value passed for songId", 400);
    yield (0, subscribe_1.subscribeToSong)(id, Number(songId));
    res.status(201).json({ message: "Song subscription sucessfull" });
}));
exports.unsubcribeController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield (0, unsubscribe_1.unsubscribe)(id);
    res.status(201).json({ message: "Unsubscription sucessfull" });
}));
exports.songController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(id, "id");
    res.status(200).json({ song: yield (0, getSong_1.getASong)(Number(id)) });
}));
exports.searchController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
