import dotenv from "dotenv";
dotenv.config();
import { File } from "../../@common/customDataTypes/File";
import { AppError } from "../../domain/entities/AppError";
import { Song } from "../../domain/entities/Song";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { ServiceRepoImp } from "../../infrastructure/repository/serviceRepoImplementation";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { RandomData } from "../../@common/helperMethods/randomData";
import { isAbsolute, join, resolve } from "path";
import fs, { access } from "fs/promises";
import { event } from "../../@common/constants/objects";
import { TempSong } from "../../domain/entities/TempSong";
import { TempSongRepoImpl } from "../../infrastructure/repository/tempSongRepoImplementation";
import { isUserAdmin } from "./helpers";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { Benefits } from "../../@common/customDataTypes/Benefits";
import { createFileNameAndSave } from "../../@common/helperMethods/file";

const { saveSong, findSongsByOwnersId } = new SongRepoImpl();
const { findPlanById } = new AdminPlanRepoImp();
const { createTempSongs, findByTuneAndDelete } = new TempSongRepoImpl();



const checkSongNumberLimitation = async (ownerId: number, planId: number) => {
  const allSongsUploadedByOwner = await findSongsByOwnersId(ownerId);
  const { benefits } = (await findPlanById(planId))!;
  if (allSongsUploadedByOwner.length === (benefits as Benefits).songLimit)
    throw new AppError("The number of songs uploads for current plan has been reached please upgrade your plan to increase your number of uploads", 401);
};

const checkTempSongLimit = async (numberOfSongsToUpload: number, planId: number) => {
  const { benefits } = (await findPlanById(planId))!;
  const numOfSongsAllowedPerUpload = (benefits as Benefits).numberOfSongsPerUpload;
  if (numberOfSongsToUpload > numOfSongsAllowedPerUpload) throw new AppError(`Your current plan only allows you to upload ${numOfSongsAllowedPerUpload} per upload`, 401);
};

export const uploadSong = async (songInfo: Song, song: File, proFile: File) => {
  //   check if the account is an admin
  const accountInfo = await isUserAdmin(songInfo.ownerId);

  if (accountInfo.adminType === "merchant" && accountInfo.planId === 0) throw new AppError("This account is not on a plan.Please subscribe to a plan to upload", 401);

  // check limations on upload base on the plan the Admin is on using the planId
  if (accountInfo.planId !== 0) await checkSongNumberLimitation(songInfo.ownerId, accountInfo.planId);

  if (!songInfo.tune) {
    songInfo.tune = `${process.env.BaseUrl}/api/v1/songs/listen/${(await createFileNameAndSave(song))}`;
  } else {
    // delete temp upload data from database
    await findByTuneAndDelete(songInfo.tune);
  }
  songInfo.profile = `${process.env.BaseUrl}/api/v1/songs/profile/${(await createFileNameAndSave(proFile))}`;

  // console.log(songInfo.tune)
  //   save the data in the data base
  await saveSong(songInfo);
};

export const uploadTempSong = async (ownerId: number, allSongs: Array<File>) => {
  const songsData: Array<TempSong> = [];
  const { planId, adminType } = await isUserAdmin(ownerId);
  for (let file of allSongs) {
    const tempSongInfo = TempSong.build({ ownerId, tune: `${process.env.BaseUrl}/api/v1/songs/listen/${(await createFileNameAndSave(file))!}`, originalName: file.originalName });
    songsData.push(tempSongInfo);
  }
  if (adminType === "merchant" && planId === 0) throw new AppError("This account is not on a plan.Please subscribe to a plan to upload", 401);
  if (planId !== 0) await checkTempSongLimit(allSongs.length, planId);

  // console.log(`ownerId=${songsData[0].ownerId} ${songsData[1].ownerId} ${songsData[2].ownerId} ${songsData[3].ownerId}`);
  await createTempSongs(songsData);
};
