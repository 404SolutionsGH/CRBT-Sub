import { event } from "../../@common/constants/objects";
import { AppError } from "../../domain/entities/AppError";
import { Reward } from "../../domain/entities/Reward";
import { SubSongs } from "../../domain/entities/SubSongs";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { SubSongsRepoImp } from "../../infrastructure/repository/subSongsRepoImplementation";
import { SystemRepoImpl } from "../../infrastructure/repository/systemRepoImplementation";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";

const { createSubscription, findSubscriptionsBySubscriberId } = new SubSongsRepoImp();
const isOnSubscription = async (subscriberId: number) => {
  const subDetail = await findSubscriptionsBySubscriberId(subscriberId, true);

  if (subDetail) return true;
  return false;
};

export const subscribeToSong = async (subscriberId: number, songId: number) => {
  const { updateSubSongId } = new UserRepoImp();
  const { findSongById, increaseNumberOfSubscribers } = new SongRepoImpl();
  const { getSysInfo } = new SystemRepoImpl();
  const { pointSettings } = await getSysInfo();
  if (await isOnSubscription(subscriberId)) throw new AppError("User Already on a subscription", 409);
  await increaseNumberOfSubscribers(1, songId);
  const songDetails = await findSongById(songId);
  if (!songDetails) throw new AppError("No such song with this id exist", 404);
  const { price } = songDetails;
  await updateSubSongId(songId, subscriberId);
  await createSubscription(SubSongs.build({ subscriberId, price, songId }));
  event.emit("updateRewardPoints", Reward.build({ accountId: subscriberId, accountType: "user" }), (pointSettings as { songPoints: number; minimumWithdraw: number }).songPoints);
};
