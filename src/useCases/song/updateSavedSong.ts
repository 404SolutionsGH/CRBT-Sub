import { join } from "path";
import { AppError } from "../../domain/entities/AppError";
import { Song } from "../../domain/entities/Song";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { checkPathExists } from "../../@common/helperMethods/path";
import { event } from "../../@common/constants/objects";

const updateFiles = async (data: { content: Buffer; fileName: string }[]) => {
  for (let file of data) {
    const { fileName, content } = file;
    const path = join(__dirname, "..", "..", "..", "/songsData", fileName);
    if (await checkPathExists(path)) {
      event.emit("saveFile", content,path);
    }
    else{
      throw new AppError("The song or profile File you are trying to update does not exist.",404)
    }
  }
};
const extractFileName = (url: string): string | null => {
  const pattern = /^https?:\/\/[^\/]+\/api\/v1\/songs\/(listen|profile)\/([^\/]+)$/;
  const match = url.match(pattern);
  if (match) {
    return match[2];
  }
  return null;
};


export const updateSavedSong = async (songInfo: Song, newSong: Buffer | undefined, newProfile: Buffer | undefined) => {
  const { updateSongInfo } = new SongRepoImpl();
  const allFilesData: { content: Buffer; fileName: string }[] = [];

  if (newSong) {
    const fileName = extractFileName(songInfo.tune);
    if (!fileName) throw new AppError("The value passed for tune should be a link", 400);
    allFilesData.push({ content: newSong, fileName });
  }

  if (newProfile) {
    const fileName = extractFileName(songInfo.profile);
    if (!fileName) throw new AppError("The value passed for profile should be a link", 400);
    allFilesData.push({ content: newProfile, fileName });
  }

  await updateFiles(allFilesData);

  const updatedSong = await updateSongInfo(songInfo);
  if (!updatedSong) throw new AppError("Could not updated,no such song exist", 404);
};
