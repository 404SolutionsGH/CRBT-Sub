import { AppError } from "../../domain/entities/AppError";
import { SubSongs } from "../../domain/entities/SubSongs";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";
import { SubSongsRepoImp } from "../../infrastructure/repository/subSongsRepoImplementation";
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
  if(await isOnSubscription(subscriberId)) throw new AppError("User Already on a subscription",409)
  await increaseNumberOfSubscribers(1, songId);
  const { price } = (await findSongById(songId))!;
  await updateSubSongId(songId, subscriberId);
  await createSubscription(SubSongs.build({ subscriberId, price, songId }));
};
