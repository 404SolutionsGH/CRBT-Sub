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
exports.setupMp3FilesInReq = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/entities/AppError");
const allowedAudioMimeTypes = [
    "audio/mpeg", // MP3
    "audio/wav", // WAV
    "audio/aac", // AAC
    "audio/ogg", // Ogg Vorbis
];
exports.setupMp3FilesInReq = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Setting up song data in request body....");
    if (!Array.isArray(req.files) && req.files !== undefined) {
        const songs = req.files.song;
        const allSongs = [];
        if (!songs)
            throw new AppError_1.AppError("The fieldname for the songs being uploaded should be song", 400);
        // checking if all the files are music files
        for (let file of songs) {
            if (!allowedAudioMimeTypes.includes(file.mimetype))
                throw new AppError_1.AppError("Only music files should be uploaded", 400);
            allSongs.push({ data: file.buffer, exetension: file.mimetype === "audio/mpeg" ? ".mp3" : file.mimetype === "audio/wav" ? ".wav" : ".aac", originalName: file.originalname });
        }
        req.body.songs = allSongs;
        next();
    }
    else {
        throw new AppError_1.AppError("No song file uploaded", 400);
    }
}));
