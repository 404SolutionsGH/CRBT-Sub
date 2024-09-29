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
exports.setImgAndMp3Files = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/entities/AppError");
const allowedAudioMimeTypes = [
    "audio/mpeg", // MP3
    "audio/wav", // WAV
    "audio/aac", // AAC
    "audio/ogg", // Ogg Vorbis
];
const allowedImageMimeType = ["image/png", "image/jpeg"];
const setUpProfile = (req, profile) => {
    console.log("Setting up profile..");
    if (profile) {
        if (allowedImageMimeType.includes(profile[0].mimetype)) {
            req.body.profile = { data: profile[0].buffer, exetension: profile[0].mimetype === "image/png" ? ".png" : ".jpeg" };
        }
        else {
            throw new AppError_1.AppError("Profile image is not in the prefered type(ie .png or .jpg)", 400);
        }
    }
    console.log("Profile set up done");
};
exports.setImgAndMp3Files = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Setting up image and song data in request body....");
    if (!Array.isArray(req.files) && req.files !== undefined) {
        const profile = req.files.profile; // the profile and song are arrays but we are experting them to have only one element
        const song = req.files.song;
        const { tune } = req.body;
        if (song && allowedAudioMimeTypes.includes(song[0].mimetype)) {
            // setting up song and profile objects and passing them into the request body
            req.body.song = { data: song[0].buffer, exetension: song[0].mimetype === "audio/mpeg" ? ".mp3" : song[0].mimetype === "audio/wav" ? ".wav" : ".aac" };
            setUpProfile(req, profile);
            console.log("Set up done");
            next();
        }
        else if (tune) {
            setUpProfile(req, profile);
            next();
        }
        else {
            throw new AppError_1.AppError(song ? "No song file uploaded" : "Audio file not in the reuired file format(ie .mp3 or .wav or .aac)", 400);
        }
    }
    else {
        throw new AppError_1.AppError("Upload Failed , no file present", 400);
    }
}));
