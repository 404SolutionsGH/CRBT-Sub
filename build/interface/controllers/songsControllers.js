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
const uploadSong_1 = require("../../useCases/song/uploadSong");
const Song_1 = require("../../domain/entities/Song");
const AppError_1 = require("../../domain/entities/AppError");
exports.uploadController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   // profile(img file) and song(mp3 file) are set up by a middleware called setImgAndMp3Files
    const { id, albumName, songTitle, artisteName, profile, song, lang, ussdCode, subscriptionType, price, category } = req.body;
    if (!songTitle || !lang || !subscriptionType)
        throw new AppError_1.AppError(`No data passed for ${(!songTitle ? "songTitle" : !lang ? "lang" : "subscriptionType")}`, 400);
    yield (0, uploadSong_1.uploadSong)(Song_1.Song.build({ ownerId: id, albumName, songTitle, artisteName, ussdCode, subscriptionType, price, category, lang }), song, profile);
    res.status(201).json({ message: "Song uploaded sucessfully" });
}));
// export const profileController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("An img is been retrieved....");
//   const { fileName } = req.params;
//   console.log("Creating file path....");
//   const pathToFile = resolve(__dirname, `./songsData/songsProfileImages/${fileName}`);
//   console.log("File path created");
//   console.log("Checking if file path exist....");
//   if (await checkPathExists(pathToFile)) {
//     res.status(200);
//     res.download(pathToFile);
//   } else {
//     res.status(200);
//     res.download(resolve(__dirname, "./songsData/songsProfileImages/brokenProf.png"));
//   }
// });
// export const listenController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("A song is been retrieved....");
//   const { fileName } = req.params;
//   console.log("Creating file path....");
//   const pathToFile = resolve(__dirname, `./songsData/songs/${fileName}`);
//   console.log("File path created");
//   console.log("Checking if file path exist....");
//   if (await checkPathExists(pathToFile)) {
//     console.log("Updating numberOfListeners of songInfo...");
//     await SongSchema.findOneAndUpdate({ _id: tObjectId(fileName.split(".")[0]) }, { $inc: { numberOfListeners: 1 } });
//     console.log("Update done");
//     res.status(200);
//     res.download(pathToFile);
//   } else {
//     res.status(404);
//     throw new Error("No song file with this id exist");
//   }
// });
// export const searchController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("A search is been done...");
//   const { songTitle, artisteName, lang, albumName, category } = req.query;
//   if (songTitle || lang || artisteName || albumName || category) {
//     const fieldsToExclude = "-__v -date -numberOfListeners -lang -numberOfSubscribers -subServiceId -albumName -ussdCode -subscriptionType";
//     const results =
//       songTitle && lang
//         ? await SongSchema.find({ songTitle: { $regex: songTitle, $options: "i" }, lang }).select(fieldsToExclude)
//         : artisteName && lang
//         ? await SongSchema.find({ artisteName: { $regex: artisteName, $options: "i" }, lang }).select(fieldsToExclude)
//         : albumName && lang
//         ? await SongSchema.find({ albumName: { $regex: albumName, $options: "i" }, lang }).select(fieldsToExclude)
//         : category && lang
//         ? await SongSchema.find({ category: { $regex: category, $options: "i" }, lang }).select(fieldsToExclude)
//         : songTitle
//         ? await SongSchema.find({ songTitle: { $regex: songTitle, $options: "i" } }).select(fieldsToExclude)
//         : artisteName
//         ? await SongSchema.find({ artisteName: { $regex: artisteName, $options: "i" } }).select(fieldsToExclude)
//         : albumName
//         ? await SongSchema.find({ albumName: { $regex: albumName, $options: "i" } }).select(fieldsToExclude)
//         : category
//         ? await SongSchema.find({ category: { $regex: category, $options: "i" } }).select(fieldsToExclude)
//         : await SongSchema.find({ lang }).select(fieldsToExclude);
//     console.log("Search complete");
//     res.status(200).json({ results, numOfSongs: results.length });
//   } else {
//     res.status(400);
//     throw new Error("Invalid request body:No songTitle passed");
//   }
// });
// export const songSubDetailController = asyncHandler(async (req: Request, res: Response) => {
//   const { songId } = req.query;
//   console.log("Getting subscrition details about a song...");
//   if (songId && typeof songId === "string") {
//     const songDetails = await SongSchema.findOne({ _id: tObjectId(songId) }).populate("subServiceId");
//     if (!songDetails) {
//       res.status(404);
//       throw new Error("No song with such id exists");
//     }
//     const serviceDetails = await CrbtServiceSchema.findOne({ ownerId: songDetails!.ownerId });
//     if (songDetails && serviceDetails) {
//       // setting up the json obj to be sent
//       console.log("Details Retrieved");
//       const detailToSend = {
//         subName: serviceDetails.serviceName,
//         category: songDetails.category,
//         price: songDetails.price,
//         currency: "ETB",
//         billing: songDetails.subscriptionType,
//         ussdCode: songDetails.ussdCode,
//         _id: songDetails._id,
//       };
//       res.status(200).json(detailToSend);
//     } else {
//       res.status(404);
//       throw new Error("No song with this id exist");
//     }
//   } else {
//     res.status(400);
//     throw new Error("Invalid request body, no data passed for songId");
//   }
// });
// export const recommendationController = asyncHandler(async (req: Request, res: Response) => {
//   //Songs are recommended to users base on a users language preference and the songs with the higest subscribers
//   console.log("Getting recommendation...");
//   const { id } = req.body;
//   const { flag } = req.query;
//   const fieldsToExclude = "-__v -date -numberOfListeners -lang -numberOfSubscribers -subServiceId -albumName -ussdCode -subscriptionType";
//   // gettting  the language preference of client
//   console.log("Getting user lang Pref...");
//   const accountInfo: Account | null = await AccountSchema.findById(id).select("langPref");
//   console.log("Language Pref retrieved");
//   if (accountInfo) {
//     const { langPref } = accountInfo;
//     if (flag) {
//       console.log("Recommendation been retrieved for albums...");
//       const albumRecom = await AlbumSchema.find({}).sort({ numberOfSubscribers: -1 }).select("-_id -__v ");
//       res.status(200).json({ results: albumRecom, numOfResults: albumRecom.length });
//     } else {
//       console.log("Recommendation been retrieved is for songs...");
//       const songRecom = await SongSchema.find({ lang: langPref }).sort({ numberOfSubscribers: -1 }).select(fieldsToExclude);
//       res.status(200).json({ results: songRecom, numOfResults: songRecom.length });
//     }
//   }
// });
// export const toneController = asyncHandler(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const fieldsToExclude = "-__v -date -numberOfListeners -lang -numberOfSubscribers -subServiceId  -ussdCode -subscriptionType";
//   const toneInfo = await SongSchema.findById(id).select(fieldsToExclude);
//   // toneInfo returns null if no song with the id in params exist
//   if (!toneInfo) {
//     res.status(404);
//     throw new Error("No tune with such id exists");
//   }
//   res.status(200).json({ tone: toneInfo });
// });
// export const toneDeletionController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("A tone is been deleted");
//   const { id } = req.params;
//   console.log("Checking if user ia authorized to delete tone");
//   const accountInfo: Account | null = await AccountSchema.findOne({ _id: tObjectId(req.body.id) });
//   if (accountInfo && (accountInfo.accountType === "admin" || accountInfo.accountType === "superAdmin")) {
//     const deletedTone = await SongSchema.findOneAndDelete({ _id: tObjectId(id) });
//     if (deletedTone) {
//       res.status(200).json({ message: `Tone with title ${deletedTone.songTitle} has been sucessfully deleted` });
//     } else {
//       throw new Error("Delete action Failed,no tone with this id exist");
//     }
//   }
// });
// export const allSongsController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("Getting All Songs..");
//   const page = parseInt(req.query.page as string) || 1; // Default to page 1
//   const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page
//   const skip = (page - 1) * limit;
//   const results = await SongSchema.find({}).skip(skip).limit(limit);
//   const total = await SongSchema.countDocuments({});
//   res.status(200).json({
//     results,
//     pagination: {
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//       totalItems: total,
//     },
//   });
// });
