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
import { AlbumSchema } from "../../schema/albumSchema";

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
  const { id, albumName, songTitle, artisteName, profile, song, lang, ussdCode, subscriptionType, price, category } = req.body;

  console.log("Uploading a song...");
  console.log("Checking if account is of the appropriate type...");
  const accountInfo: Account | null = await AccountSchema.findOne({ _id: tObjectId(id) }).populate("service");

  if (accountInfo && accountInfo?.accountType !== "norm" && songTitle && artisteName && ussdCode && subscriptionType && price && category) {
    // console.log("Checking account songs limit...");

    if (accountInfo?.service || accountInfo?.accountType === "superAdmin") {
      console.log("Songs limit not reached,upload can proceed");
      console.log("Checking if songs with this title already exist...");
      if ((await SongSchema.find({ ownerId: tObjectId(id), songTitle, artisteName })).length !== 0) {
        console.log("A song with this title has already been uploaded");
        throw new Error("Song has already been uploaded");
      }
      console.log("Song does not exist in database");

      console.log("Saving info about song...");
      console.log("Generating songId...");
      const songId = new Types.ObjectId();
      const songDataSaved = await SongSchema.create({
        _id: songId,
        songTitle,
        artisteName,
        price,
        category,
        lang: lang ? lang : "eng",
        ownerId: tObjectId(id),
        albumName: albumName ? albumName : "N/A",
        ussdCode,
        subscriptionType,
        profile: profile ? `/${String(songId)}${profile.exetension}` : "/defaultProf.png",
        song: `/${String(songId)}${song.exetension}`,
      });
      console.log("Song Info saved sucessfully");

      console.log("Checking if there is an albumName and if it already exist..");

      if (albumName && !(await AlbumSchema.findOne({ name: albumName }))) {
        console.log("Album does not exist, creating album ..");
        await AlbumSchema.create({ name: albumName, artisteName, numOfSongs: 1, profile: profile ? `/${String(songId)}${profile.exetension}` : "/defaultProf.png" });
      } else {
        console.log(!albumName ? "No data in albumName in request body" : "An album with this name exist");
        if (albumName) {
          await AlbumSchema.updateOne({ name: albumName }, { $inc: { numOfSongs: 1 } });
        }
      }

      // Saving song's profile image and mp3 file using the ObjectId of it saved info
      console.log("Saving song profile image and mp3 files");

      if (profile) {
        // checking if the profile was set(this is because is not compulsory to upload an image when uploading a sond)
        await writeFile(resolve(__dirname, `./songsData/songsProfileImages/${songDataSaved._id}${profile.exetension}`), profile.data);
      }
      await writeFile(resolve(__dirname, `./songsData/songs/${songDataSaved._id}${song.exetension}`), song.data);
      console.log("Files sucessfully saved..");
      if (accountInfo?.service) {
        console.log("Updating this account's crbt service document by adding the saved song's id....");
        await CrbtServiceSchema.findOneAndUpdate({ ownerId: tObjectId(id) }, { $push: { songs: { $each: [songDataSaved._id], $position: 0 } } });
        console.log("Update done");
      }
      res.status(200).json({ message: "Song saved successfully" });
    } else {
      console.log("Do not have an CRBT service to upload songs to");
      res.status(400);
      throw new Error("Do not have an CRBT service to upload songs to");
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
  const { songTitle, artisteName, lang, albumName, category } = req.query;

  if (songTitle || lang || artisteName || albumName || category) {
    const fieldsToExclude = "-__v -date -numberOfListeners -lang -numberOfSubscribers -subServiceId -albumName -ussdCode -subscriptionType";
    const results =
      songTitle && lang
        ? await SongSchema.find({ songTitle: { $regex: songTitle, $options: "i" }, lang }).select(fieldsToExclude)
        : artisteName && lang
        ? await SongSchema.find({ artisteName: { $regex: artisteName, $options: "i" }, lang }).select(fieldsToExclude)
        : albumName && lang
        ? await SongSchema.find({ albumName: { $regex: albumName, $options: "i" }, lang }).select(fieldsToExclude)
        : category && lang
        ? await SongSchema.find({ category: { $regex: category, $options: "i" }, lang }).select(fieldsToExclude)
        : songTitle
        ? await SongSchema.find({ songTitle: { $regex: songTitle, $options: "i" } }).select(fieldsToExclude)
        : artisteName
        ? await SongSchema.find({ artisteName: { $regex: artisteName, $options: "i" } }).select(fieldsToExclude)
        : albumName
        ? await SongSchema.find({ albumName: { $regex: albumName, $options: "i" } }).select(fieldsToExclude)
        : category
        ? await SongSchema.find({ category: { $regex: category, $options: "i" } }).select(fieldsToExclude)
        : await SongSchema.find({ lang }).select(fieldsToExclude);

    console.log("Search complete");
    res.status(200).json({ results, numOfSongs: results.length });
  } else {
    res.status(400);
    throw new Error("Invalid request body:No songTitle passed");
  }
});

export const songSubDetailController = asyncHandler(async (req: Request, res: Response) => {
  const { songId } = req.query;
  console.log("Getting subscrition details about a song...");

  if (songId && typeof songId === "string") {
    const songDetails = await SongSchema.findOne({ _id: tObjectId(songId) }).populate("subServiceId");

    if(!songDetails){
      res.status(404)
      throw new Error("No song with such id exists")
    }
    const serviceDetails = await CrbtServiceSchema.findOne({ownerId:songDetails!.ownerId})
    if (songDetails && serviceDetails) {
      // setting up the json obj to be sent
      console.log("Details Retrieved");
      const detailToSend = {
        subName: serviceDetails.serviceName,
        category: songDetails.category,
        price: songDetails.price,
        currency: "ETB",
        billing: songDetails.subscriptionType,
        ussdCode: songDetails.ussdCode,
        _id: songDetails._id,
      };

      res.status(200).json(detailToSend);
    } else {
      res.status(404);
      throw new Error("No song with this id exist");
    }
  } else {
    res.status(400);
    throw new Error("Invalid request body, no data passed for songId");
  }
});

export const recommendationController = asyncHandler(async (req: Request, res: Response) => {
  //Songs are recommended to users base on a users language preference and the songs with the higest subscribers
  console.log("Getting recommendation...");
  const { id } = req.body;
  const { flag } = req.query;
  const fieldsToExclude = "-__v -date -numberOfListeners -lang -numberOfSubscribers -subServiceId -albumName -ussdCode -subscriptionType";

  // gettting  the language preference of client
  console.log("Getting user lang Pref...");
  const accountInfo: Account | null = await AccountSchema.findById(id).select("langPref");
  console.log("Language Pref retrieved");

  if (accountInfo) {
    const { langPref } = accountInfo;

    if (flag) {
      console.log("Recommendation been retrieved for albums...");
      const albumRecom = await AlbumSchema.find({}).sort({ numberOfSubscribers: -1 }).select("-_id -__v ");
      res.status(200).json({ results: albumRecom, numOfResults: albumRecom.length });
    } else {
      console.log("Recommendation been retrieved is for songs...");
      const songRecom = await SongSchema.find({ lang: langPref }).sort({ numberOfSubscribers: -1 }).select(fieldsToExclude);
      res.status(200).json({ results: songRecom, numOfResults: songRecom.length });
    }
  }
});

export const toneController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const fieldsToExclude = "-__v -date -numberOfListeners -lang -numberOfSubscribers -subServiceId  -ussdCode -subscriptionType";
  const toneInfo = await SongSchema.findById(id).select(fieldsToExclude);

  // toneInfo returns null if no song with the id in params exist
  if (!toneInfo) {
    res.status(404);
    throw new Error("No tune with such id exists");
  }

  res.status(200).json({ tone: toneInfo });
});

export const toneDeletionController = asyncHandler(async (req: Request, res: Response) => {
  console.log("A tone is been deleted");
  const { id } = req.params;

  console.log("Checking if user ia authorized to delete tone");
  const accountInfo: Account | null = await AccountSchema.findOne({ _id: tObjectId(req.body.id) });
  if (accountInfo && (accountInfo.accountType === "admin" || accountInfo.accountType === "superAdmin")) {
    const deletedTone = await SongSchema.findOneAndDelete({ _id: tObjectId(id) });
    if (deletedTone) {
      res.status(200).json({ message: `Tone with title ${deletedTone.songTitle} has been sucessfully deleted` });
    } else {
      throw new Error("Delete action Failed,no tone with this id exist");
    }
  }
});

export const allSongsController = asyncHandler(async (req: Request, res: Response) => {
  console.log("Getting All Songs..");
  const page = parseInt(req.query.page as string) || 1; // Default to page 1
  const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
  const skip = (page - 1) * limit;

  const results = await SongSchema.find({}).skip(skip).limit(limit);

  const total = await SongSchema.countDocuments({});

  res.status(200).json({
    results,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    },
  });
});
