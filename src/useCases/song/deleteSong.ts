import { event } from "../../@common/constants/objects";
import { extractFileName } from "../../@common/helperMethods/file";
import { AppError } from "../../domain/entities/AppError";
import { Song } from "../../domain/entities/Song";
import { TempSong } from "../../domain/entities/TempSong";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { TempSongRepoImpl } from "../../infrastructure/repository/tempSongRepoImplementation";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";

const { findSongById, deleteSongById, flagSongForDeletion } = new SongRepoImpl();
const { deleteSong, findTempSongById } = new TempSongRepoImpl();
const canAdminDeleteSong = async (songId: number, adminId: number, flag: "saved" | "temp" = "saved") => {
  let songDetail: Song | TempSong | null;
  if (flag === "saved") songDetail = await findSongById(songId, true);
  else songDetail = await findTempSongById(songId);
  if (!songDetail) throw new AppError("Song Deletion failed,no such song exists", 404);
  //Delete the actual song files and profile 
  event.emit("deleteFile", extractFileName(songDetail.tune));
  if(flag==="saved") event.emit("deleteFile", extractFileName((songDetail as Song).profile));
};

export const deleteSavedSong = async (songId: number, adminId: number) => {
  const { getAllUserBySubSongId } = new UserRepoImp();
  const allUserSubOnSong = await getAllUserBySubSongId(songId);
  if (allUserSubOnSong.length !== 0) {
    // flag the song for deletion
    await flagSongForDeletion(songId);
    throw new AppError("Song deletion failed,but has been flag for automatic deletion later when no one is on it", 409);
  }
  await canAdminDeleteSong(songId, adminId);
  await deleteSongById(songId);
};

export const deleteTempSong = async (songId: number, adminId: number) => {
  await canAdminDeleteSong(songId, adminId, "temp");
  await deleteSong(songId);
};
