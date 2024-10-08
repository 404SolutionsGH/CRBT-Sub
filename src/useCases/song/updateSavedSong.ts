import { AppError } from "../../domain/entities/AppError";
import { Song } from "../../domain/entities/Song";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";

export const updateSavedSong = async (songInfo: Song) => {
  const { updateSongInfo } = new SongRepoImpl();
  const updatedSong = await updateSongInfo(songInfo);
  if (!updatedSong) throw new AppError("Could not updated,no such song exist", 404);
};
