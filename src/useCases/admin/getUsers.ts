import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { SubSongsRepoImp } from "../../infrastructure/repository/subSongsRepoImplementation";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";

export const getAllUsers = async () => {
  const { getUsers } = new UserRepoImp();
  return await getUsers();
};

export const getSubUsers = async (adminId: number,type:"sub"|"unSub") => {
  const { findSongsByOwnersId } = new SongRepoImpl();
  const {findSubscriptionBySongIds}= new SubSongsRepoImp()
  const songs = await findSongsByOwnersId(adminId);
  if (songs.length === 0) return [];
  const songIds:number[] = [];
  songs.forEach((song) => {
    songIds.push(song.id);
  });
  return await findSubscriptionBySongIds(songIds,type)
};
