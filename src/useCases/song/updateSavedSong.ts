import dotenv from "dotenv";
dotenv.config();
import { AppError } from "../../domain/entities/AppError";
import { Song } from "../../domain/entities/Song";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { event } from "../../@common/constants/objects";
import { File } from "../../@common/customDataTypes/File";
import { createFileNameAndSave, extractFileName } from "../../@common/helperMethods/file";


export const updateSavedSong = async (songInfo: Song, newSong: File | undefined, newProfile: File | undefined) => {
  const { updateSongInfo } = new SongRepoImpl();

  if (newSong) {
    const fileName = extractFileName(songInfo.tune);
    if (!fileName) throw new AppError("The value passed for tune should be a link", 400);
    event.emit("deleteFile", fileName);
    songInfo.tune = `${process.env.BaseUrl}/api/v1/songs/listen/${await createFileNameAndSave(newSong)}`;
  }

  if (newProfile) {
    const fileName = extractFileName(songInfo.profile);
    if (!fileName) throw new AppError("The value passed for profile should be a link", 400);
    event.emit("deleteFile", fileName);
    songInfo.profile = `${process.env.BaseUrl}/api/v1/songs/profile/${await createFileNameAndSave(newProfile)}`;
  }

  const updatedSong = await updateSongInfo(songInfo);
  if (!updatedSong) throw new AppError("Could not updated,no such song exist", 404);
};
