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

export const uploadController = asyncHandler(async (req: Request, res: Response) => {
  //   // profile(img file) and song(mp3 file) are set up by a middleware called setImgAndMp3Files
  const { id, albumName, songTitle, artisteName, profile, song, lang, ussdCode, tune, subscriptionType, price, category } = req.body;

  if (!songTitle || !lang || !subscriptionType) throw new AppError(`No data passed for ${!songTitle ? "songTitle" : !lang ? "lang" : "subscriptionType"}`, 400);
  await uploadSong(Song.build({ ownerId: id, albumName, songTitle, artisteName, ussdCode, subscriptionType, price, category, lang, tune }), song as File, profile as File);

  res.status(201).json({ message: "Song uploaded sucessfully" });
});

export const updateSavedSongController = asyncHandler(async (req: Request, res: Response) => {
  const { updatedSongData } = req.body;
  const { id, albumName, songTitle, artisteName, profile, lang, ussdCode, tune, subscriptionType, price, category } = updatedSongData as SongI;
  if (!id) throw new AppError("No data passed for id in the updatedSongData object in request body", 400);
  await updateSavedSong(Song.build({ id, albumName, songTitle, artisteName, profile, lang, ussdCode, tune, subscriptionType, price, category, ownerId: req.body.id }));

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
  const { id, songId } = req.body;
  if (!songId || typeof songId !== "number") throw new AppError(!songId ? "No value passed for songId" : "songId must be a number", 400);
  await subscribeToSong(id, songId);
  res.status(201).json({ message: "Song subscription sucessfull" });
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

export const searchController = asyncHandler(async (req: Request, res: Response) => {});
