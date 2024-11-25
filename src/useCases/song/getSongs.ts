import { AppError } from "../../domain/entities/AppError";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { TempSongRepoImpl } from "../../infrastructure/repository/tempSongRepoImplementation";
import { isUserAdmin } from "./helpers";

export const getTempUploads = async (ownerId: number) => {
  const accountInfo = await isUserAdmin(ownerId);
  const { findTempSongsByOwnersId } = new TempSongRepoImpl();
  return await findTempSongsByOwnersId(ownerId, accountInfo.adminType === "system");
};

export const getSavedUploads = async (ownerId: number) => {
  const accountInfo = await isUserAdmin(ownerId);
  const { findSongsByOwnersId } = new SongRepoImpl();
  return await findSongsByOwnersId(ownerId, accountInfo.adminType === "system");
};

export const getAllSongs = async (id: number) => {
  // const {adminType} = await isUserAdmin(id);
  // if(adminType!=="system")throw new AppError("This account is not authorized to get all songs in the system",401)
  const { getAllSongs } = new SongRepoImpl();
  return await getAllSongs();
};
