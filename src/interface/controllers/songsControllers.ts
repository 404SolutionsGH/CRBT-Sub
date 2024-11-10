import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { writeFile } from "fs/promises";
import { isAbsolute, resolve } from "path";
import fs, { access } from "fs/promises";
import { uploadSong, uploadTempSong } from "../../useCases/song/uploadSong";
import { Song, SongI } from "../../domain/entities/Song";
import { AppError } from "../../domain/entities/AppError";
import { File } from "../../@common/customDataTypes/File";
import { getAllSongs, getSavedUploads, getTempUploads } from "../../useCases/song/getSongs";
import { subscribeToSong } from "../../useCases/song/subscribe";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { unsubscribe } from "../../useCases/song/unsubscribe";
import { listen } from "../../useCases/song/listen";
import { updateSavedSong } from "../../useCases/song/updateSavedSong";
import { isStringContentNumber } from "../../@common/helperMethods/isStringNumber";
import { getASong } from "../../useCases/song/getSong";
import { deleteSavedSong, deleteTempSong } from "../../useCases/song/deleteSong";

export const uploadController = asyncHandler(async (req: Request, res: Response) => {
  //   // profile(img file) and song(mp3 file) are set up by a middleware called setImgAndMp3Files
  const { id, albumName, songTitle, artisteName, profile, song, lang, ussdCode, tune, subscriptionType, price, category, registrationUssdCode } = req.body;

  if (!songTitle || !lang || !subscriptionType) throw new AppError(`No data passed for ${!songTitle ? "songTitle" : !lang ? "lang" : "subscriptionType"}`, 400);
  await uploadSong(Song.build({ ownerId: id, albumName, songTitle, artisteName, ussdCode, subscriptionType, price, category, lang, tune, registrationUssdCode }), song as File, profile as File);

  res.status(201).json({ message: "Song uploaded sucessfully" });
});

export const updateSavedSongController = asyncHandler(async (req: Request, res: Response) => {
  console.log("Updating Saved Song");
  const { albumName, songTitle, artisteName, profile, lang, ussdCode, tune, subscriptionType, price, category, registrationUssdCode } = req.body;
  const { id } = req.params;
  if (!id) throw new AppError("No data passed for id in  in request body", 400);
  isStringContentNumber(id, "id");
  let newTune: File | undefined;
  let newProfile: File | undefined;

  if (!Array.isArray(req.files) && req.files !== undefined) {
    if (req.files.newTune || req.files.newProfile) {
      newTune = req.files.newTune
        ? { data: req.files.newTune[0].buffer, exetension: req.files.newTune[0].mimetype === "audio/mpeg" ? ".mp3" : req.files.newTune[0].mimetype === "audio/wav" ? ".wav" : ".aac" }
        : undefined;
      newProfile = req.files.newProfile ? { data: req.files.newProfile[0].buffer, exetension: req.files.newProfile[0].mimetype === "image/png" ? ".png" : ".jpeg" } : undefined;
    } 
  }
  await updateSavedSong(
    Song.build({ id: Number(id), albumName, songTitle, artisteName, profile, lang, ussdCode, tune, subscriptionType, price, category, ownerId: req.body.id, registrationUssdCode }),
    newTune,
    newProfile
  );

  res.status(201).json({ message: "Song updated sucessfully" });
});

export const tempUploadController = asyncHandler(async (req: Request, res: Response) => {
  const { id, songs } = req.body;
  await uploadTempSong(id, songs);
  res.status(201).json({ message: `All ${(songs as Array<File>).length} songs have been uploaded sucessfully` });
});

export const getUploadedSongsController = asyncHandler(async (req: Request, res: Response) => {
  const { state } = req.params;
  const { id } = req.body;
  let songs: any;
  if (state === "saved") {
    songs = await getSavedUploads(id);
  } else if (state === "temp") {
    songs = await getTempUploads(id);
  } else {
    throw new AppError("The parameter state should have a value saved or temp", 400);
  }
  res.status(200).json({ songs });
});

export const getAllSongsController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  const allSongs = await getAllSongs(id);
  res.status(200).json({ allSongs });
});

export const profileController = asyncHandler(async (req: Request, res: Response) => {
  console.log("An img is been retrieved....");
  const { path } = req.body;
  res.status(200).download(path as string);
});

export const listenController = asyncHandler(async (req: Request, res: Response) => {
  console.log("A song is been retrieved....");
  const { path } = req.body;
  await listen(req.url);
  res.status(200).download(path as string);
});

export const subcribeController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  const { songId } = req.params;
  isStringContentNumber(songId, "songId");
  if (!songId) throw new AppError("No value passed for songId", 400);
  await subscribeToSong(id, Number(songId));
  res.status(201).json({ message: "Song subscription successfull" });
});

export const unsubcribeController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  await unsubscribe(id);
  res.status(201).json({ message: "Unsubscription sucessfull" });
});

export const songController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  isStringContentNumber(id, "id");
  res.status(200).json({ song: await getASong(Number(id)) });
});

export const deleteSongController = asyncHandler(async (req: Request, res: Response) => {
  const { state, songId } = req.params;
  const { id } = req.body;
  isStringContentNumber(songId, "songId");
  if (state === "saved") {
    await deleteSavedSong(Number(songId), id);
  } else if (state === "temp") {
    await deleteTempSong(Number(songId), id);
  } else {
    throw new AppError(`the value passed for state should either be saved or temp not ${state}`, 400);
  }
  res.status(200).json({ messge: "Song Deletion sucessfull" });
});

export const searchController = asyncHandler(async (req: Request, res: Response) => {});
