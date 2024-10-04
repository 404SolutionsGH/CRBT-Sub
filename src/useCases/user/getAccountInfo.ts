import { ServiceRepoImp } from "../../infrastructure/repository/serviceRepoImplementation";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";

export const getAccountInfo = async (id: number) => {
  const userRepo = new UserRepoImp();
  const { findSongById } = new SongRepoImpl();
  const serviceRepo = new ServiceRepoImp();
  const accountInfo = await userRepo.findUserById(id);
  const { firstName, lastName, accountBalance, phone, langPref, subSongId } = accountInfo!;
  let subSongDetails: null | {} = null;
  if (subSongId !== 0) {
    const { artisteName, songTitle, subscriptionType, price, profile } = (await findSongById(subSongId))!;
    subSongDetails = { artisteName, songTitle, subscriptionType, price, profile };
  }
  return { firstName, lastName, accountBalance, phone, langPref, subSongDetails };
};
