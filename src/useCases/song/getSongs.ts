import { AppError } from "../../domain/entities/AppError";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { TempSongRepoImpl } from "../../infrastructure/repository/tempSongRepoImplementation";
import { isUserAdmin } from "./helpers";

export const getTempUploads = async (ownerId: number) => {
  await isUserAdmin(ownerId);
  const { findTempSongsById } = new TempSongRepoImpl();
  return await findTempSongsById(ownerId);
};

export const getSavedUploads = async (ownerId: number) => {
  await isUserAdmin(ownerId);
  const { findSongsByOwnersId } = new SongRepoImpl();
  return await findSongsByOwnersId(ownerId);
};

export const getAllSongs = async (id: number) => {
  // const {adminType} = await isUserAdmin(id);
  // if(adminType!=="system")throw new AppError("This account is not authorized to get all songs in the system",401)
  const { getAllSongs } = new SongRepoImpl();
  return await getAllSongs();
};
