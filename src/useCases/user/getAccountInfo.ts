import { AppError } from "../../domain/entities/AppError";
import { RewardRepoImpl } from "../../infrastructure/repository/rewardRepoImplementation";
import { ServiceRepoImp } from "../../infrastructure/repository/serviceRepoImplementation";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";

export const getAccountInfo = async (id: number) => {
  const userRepo = new UserRepoImp();
  const { findSongById } = new SongRepoImpl();
  const { get } = new RewardRepoImpl();
  const accountInfo = await userRepo.findUserById(id);
  if (!accountInfo) throw new AppError("Acount Info not retrieved,Account does not exist", 404);
  const { firstName, lastName, accountBalance, phone, langPref, subSongId, createdAt,profile } = accountInfo!;
  let subSongDetails: null | {} = null;
  if (subSongId !== 0) {
    const { artisteName, songTitle, subscriptionType, price, profile } = (await findSongById(subSongId))!;
    subSongDetails = { artisteName, songTitle, subscriptionType, price, profile };
  }
  const rewardInfo = await get(id);
  return { firstName, lastName, accountBalance, phone, profile,langPref, subSongDetails, createdAt, rewardPoints: rewardInfo ? rewardInfo.points : 0 };
};
