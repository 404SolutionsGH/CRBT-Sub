import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AccountSchema } from "../../schema/accountSchema";
import { tObjectId } from "../../libs/mongoose";
import { Account } from "../../components/customDataTypes";
import { Schema } from "mongoose";
import { SongSchema } from "../../schema/songSchema";
import { writeFile } from "fs/promises";
import { isAbsolute, resolve } from "path";
import { CrbtServiceSchema } from "../../schema/crbtServiceSchema";
import { Types } from "mongoose";
import fs, { access } from "fs/promises";

// helper methods

const checkPathExists = async (path: string): Promise<boolean> => {
  try {
    await access(path, fs.constants.F_OK);
    console.log("Path exists.");
    return true;
  } catch (err) {
    console.log("Path does not exist.");
    return false;
  }
};

export const uploadController = asyncHandler(async (req: Request, res: Response) => {
  // profile(img file) and song(mp3 file) are set up by a middleware called setImgAndMp3Files
  const { id, albumName, songTitle, artisteName, profile, song, lang, ussdCode, subscriptionType } = req.body;

  console.log("Uploading a song...");
  console.log("Checking if account is of the appropriate type...");
  const accountInfo: Account | null = await AccountSchema.findOne({ _id: tObjectId(id) }).populate("service");

  if (accountInfo && accountInfo?.accountType !== "norm" && songTitle && artisteName && ussdCode && subscriptionType) {
    console.log("Checking account songs limit...");

    if (
      !(accountInfo.service instanceof Schema.Types.ObjectId) &&
      accountInfo.service.songs.length <=
        Number(
          accountInfo.service.planType === "basic"
            ? process.env.basicServiceSongsLimit
            : accountInfo.service.planType === "silver"
            ? process.env.silverServiceSongsLimit
            : process.env.goldServiceSongsLimit
        )
    ) {
      console.log("Checking if songs with this title already exist...");
      if ((await SongSchema.find({ subServiceId: accountInfo.service._id, songTitle, artisteName })).length !== 0) {
        console.log("A song with this title has already been uploaded");
        throw new Error("Song has already been uploaded");
      }
      console.log("Song does not exist in database");

      console.log("Songs limit not reached,upload can proceed");
      console.log("Saving info about song...");
      console.log("Generating songId...");
      const songId = new Types.ObjectId();
      const songDataSaved = await SongSchema.create({
        _id: songId,
        songTitle,
        artisteName,
        lang: lang ? lang : "eng",
        subServiceId: accountInfo.service._id,
        albumName: albumName ? albumName : "N/A",
        ussdCode,
        subscriptionType,
        profile: profile ? `/${String(songId)}${profile.exetension}` : "/defaultProf.png",
        song: `/${String(songId)}${song.exetension}`,
      });
      console.log("Song Info saved sucessfully");

      // Saving song's profile image and mp3 file using the ObjectId of it saved info
      console.log("Saving song profile image and mp3 files");

      if (profile) {
        // checking if the profile was set(this is because is not compulsory to upload an image when uploading a sond)
        await writeFile(resolve(__dirname, `./songsData/songsProfileImages/${songDataSaved._id}${profile.exetension}`), profile.data);
      }
      await writeFile(resolve(__dirname, `./songsData/songs/${songDataSaved._id}${song.exetension}`), song.data);
      console.log("Files sucessfully saved..");

      console.log("Updating this account's crbt service document by adding the saved song's id....");
      await CrbtServiceSchema.findOneAndUpdate({ _id: accountInfo.service._id }, { $push: { songs: { $each: [songDataSaved._id], $position: 0 } } });
      console.log("Update done");

      res.status(200).json({ message: "Song saved successfully" });
    } else {
      console.log("Songs upload limit reached");
      throw new Error("Songs upload limit reached");
    }
  } else {
    if (!songTitle || !artisteName || !ussdCode || !subscriptionType) {
      res.status(400);
      throw new Error("Song upload failed ,Invalid request body");
    }
    res.status(401);
    throw new Error(!accountInfo?.service ? "Do not have an CRBT service to upload songs to" : "This account type is not authorized to upload a song");
  }
});

export const profileController = asyncHandler(async (req: Request, res: Response) => {
  console.log("An img is been retrieved....");
  const { fileName } = req.params;
  console.log("Creating file path....");
  const pathToFile = resolve(__dirname, `./songsData/songsProfileImages/${fileName}`);
  console.log("File path created");
  console.log("Checking if file path exist....");

  if (await checkPathExists(pathToFile)) {
    res.status(200);
    res.download(pathToFile);
  } else {
    res.status(200);
    res.download(resolve(__dirname, "./songsData/songsProfileImages/brokenProf.png"));
  }
});

export const listenController = asyncHandler(async (req: Request, res: Response) => {
  console.log("A song is been retrieved....");
  const { fileName } = req.params;
  console.log("Creating file path....");
  const pathToFile = resolve(__dirname, `./songsData/songs/${fileName}`);
  console.log("File path created");
  console.log("Checking if file path exist....");

  if (await checkPathExists(pathToFile)) {
    console.log("Updating numberOfListeners of songInfo...");
    await SongSchema.findOneAndUpdate({ _id: tObjectId(fileName.split(".")[0]) }, { $inc: { numberOfListeners: 1 } });
    console.log("Update done");
    res.status(200);
    res.download(pathToFile);
  } else {
    res.status(404);
    throw new Error("No song file with this id exist");
  }
});

export const searchController = asyncHandler(async (req: Request, res: Response) => {
  console.log("A search is been done...");
  const { songTitle, artisteName, lang } = req.query;

  if (songTitle || lang || artisteName) {
    const fieldsToExclude = "-_id -__v -date -numberOfListeners -lang";
    const results =
      songTitle && lang
        ? await SongSchema.find({ songTitle: { $regex: songTitle, $options: "i" }, lang }).select(fieldsToExclude)
        : artisteName && lang
        ? await SongSchema.find({ artisteName: { $regex: artisteName, $options: "i" }, lang }).select(fieldsToExclude)
        : songTitle
        ? await SongSchema.find({ songTitle: { $regex: songTitle, $options: "i" } }).select(fieldsToExclude)
        : artisteName
        ? await SongSchema.find({ artisteName: { $regex: artisteName, $options: "i" } }).select(fieldsToExclude)
        : await SongSchema.find({ lang }).select(fieldsToExclude);

    console.log("Search complete")
    res.status(200).json({ results, numOfSongs: results.length });
  } else {
    res.status(400);
    throw new Error("Invalid request body:No songTitle passed");
  }
});
