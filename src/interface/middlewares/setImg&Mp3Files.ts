import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/entities/AppError";

const allowedAudioMimeTypes = [
  "audio/mpeg", // MP3
  "audio/wav", // WAV
  "audio/aac", // AAC
  "audio/ogg", // Ogg Vorbis
];

const allowedImageMimeType = ["image/png", "image/jpeg"];

const setUpProfile = (req: Request, profile: Express.Multer.File[]) => {
  console.log("Setting up profile..");
  if (profile) {
    if (allowedImageMimeType.includes(profile[0].mimetype)) {
      req.body.profile = { data: profile[0].buffer, exetension: profile[0].mimetype === "image/png" ? ".png" : ".jpeg" };
    } else {
      throw new AppError("Profile image is not in the prefered type(ie .png or .jpg)", 400);
    }
  }
  console.log("Profile set up done");
};

export const setImgAndMp3Files = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
    } else if (tune) {
      setUpProfile(req, profile);
      next()
    } else {
      throw new AppError(song ? "No song file uploaded" : "Audio file not in the reuired file format(ie .mp3 or .wav or .aac)", 400);
    }
  } else {
    throw new AppError("Upload Failed , no file present", 400);
  }
});
