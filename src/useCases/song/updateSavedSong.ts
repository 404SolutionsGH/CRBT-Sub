import dotenv from "dotenv";
dotenv.config();
import { AppError } from "../../domain/entities/AppError";
import { Song } from "../../domain/entities/Song";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { event } from "../../@common/constants/objects";
import { File } from "../../@common/customDataTypes/File";
import { createFileNameAndSave } from "../../@common/helperMethods/file";

// const updateFiles = async (data: { content: Buffer; fileName: string }[]) => {
//   for (let file of data) {
//     const { fileName, content } = file;
//     const path = join(__dirname, "..", "..", "..", "/songsData", fileName);
//     if (await checkPathExists(path)) {
//       event.emit("saveFile", content,path);
//     }
//     else{
//       throw new AppError("The song or profile File you are trying to update does not exist.",404)
//     }
//   }
// };

const extractFileName = (url: string): string | null => {
  // const pattern = /^https?:\/\/[^\/]+\/api\/v1\/songs\/(listen|profile)\/([^\/]+)$/;
  const urlComponents = url.split("/");
  if (urlComponents.length !== 0) {
    return urlComponents[urlComponents.length - 1];
  }
  return null;
};

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
