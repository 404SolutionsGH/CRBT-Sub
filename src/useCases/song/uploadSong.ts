import dotenv from "dotenv";
dotenv.config();
import { File } from "../../@common/customDataTypes/File";
import { AppError } from "../../domain/entities/AppError";
import { Song } from "../../domain/entities/Song";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { ServiceRepoImp } from "../../infrastructure/repository/serviceRepoImplementation";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { RandomData } from "../../@common/helperMethods/randomData";
import { isAbsolute, resolve } from "path";
import fs, { access } from "fs/promises";
import { event } from "../../@common/constants/objects";
import { TempSong } from "../../domain/entities/TempSong";
import { TempSongRepoImpl } from "../../infrastructure/repository/tempSongRepoImplementation";
import { isUserAdmin } from "./helpers";



const isMerchantOnPlan = async (id: number) => {
  const { findServiceById } = new ServiceRepoImp();
  const serviceInfo = await findServiceById(id);
  if (!serviceInfo) throw new AppError("This Account does not have a service, please contact system Adimns to get one", 404);
};

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

const createFileNameAndSave = async (file: File) => {
  const { getRandomString } = new RandomData();
  const isNameUnique = false;
  let fileName: string;
  while (!isNameUnique) {
    fileName = `${getRandomString(20)}${file.exetension}`;
    const path = `${__dirname.replace("\\build\\useCases\\song", `\\songsData\\${fileName}`)}`;

    // check if the file exist
    if (!(await checkPathExists(path))) {
      // emit the File path and buffer for storage
      event.emit("saveFile", file.data, path);
      return fileName;
    }
  }
};

export const uploadSong = async (songInfo: Song, song: File, proFile: File) => {
  const { saveSong } = new SongRepoImpl();

  //   check if the account is an admin
  const accountInfo = await isUserAdmin(songInfo.ownerId);

  if (accountInfo.adminType === "merchant" && accountInfo.planId === 0) throw new AppError("This account is not on a plan.Please subscribe to a plan to upload", 401);

  // check limations on upload base on the plan the Admin is on using the planId(Not implemented.)

  if(!songInfo.tune){
    songInfo.tune = `${process.env.BaseUrl}/api/v1/listen/${(await createFileNameAndSave(song))!}`;
  }
  songInfo.profile = `${process.env.BaseUrl}/api/v1/profile/${(await createFileNameAndSave(proFile))!}`;

  // console.log(songInfo.tune)
  //   save the data in the data base
  await saveSong(songInfo);
};

export const uploadTempSong = async (ownerId: number, allSongs: Array<File>) => {
  const { createTempSongs } = new TempSongRepoImpl();
  const songsData: Array<TempSong> = [];
  for (let file of allSongs) {
    const tempSongInfo = TempSong.build({ ownerId, tune: `${process.env.BaseUrl}/api/v1/listen/${(await createFileNameAndSave(file))!}` });
    songsData.push(tempSongInfo);
  }

  // console.log(`ownerId=${songsData[0].ownerId} ${songsData[1].ownerId} ${songsData[2].ownerId} ${songsData[3].ownerId}`);
  await createTempSongs(songsData);
};
