import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/entities/AppError";
import { File } from "../../@common/customDataTypes/File";

const allowedAudioMimeTypes = [
  "audio/mpeg", // MP3
  "audio/wav", // WAV
  "audio/aac", // AAC
  "audio/ogg", // Ogg Vorbis
];

export const setupMp3FilesInReq = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log("Setting up song data in request body....");
  if (!Array.isArray(req.files) && req.files !== undefined) {
    const songs = req.files.song;
    const allSongs:Array<File>=[]
    if (!songs) throw new AppError("The fieldname for the songs being uploaded should be song", 400);
    // checking if all the files are music files

    for (let file of songs) {
      if (!allowedAudioMimeTypes.includes(file.mimetype)) throw new AppError("Only music files should be uploaded", 400);
      allSongs.push({ data: file.buffer, exetension: file.mimetype === "audio/mpeg" ? ".mp3" : file.mimetype === "audio/wav" ? ".wav" : ".aac", originalName :file.originalname});
    }
    req.body.songs = allSongs;
    next();
  } else {
    throw new AppError("No song file uploaded", 400);
  }
});
