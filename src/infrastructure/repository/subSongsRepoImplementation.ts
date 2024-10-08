import { AppError } from "../../domain/entities/AppError";
import { SubSongs } from "../../domain/entities/SubSongs";
import { SubSongsRepository } from "../../domain/interfaces/subSongsRepository";

export class SubSongsRepoImp implements SubSongsRepository {
  async createSubscription(subDetails: SubSongs): Promise<SubSongs> {
    const { price, songId, subscriberId } = subDetails;
    return await SubSongs.create({ price, songId, subscriberId });
  }
  async findSubscriptionsBySubscriberId(subscriberId: number, isSubValid: boolean | null = null, update: boolean = false): Promise<SubSongs | null> {
    if (update) {
      const updatedData = await SubSongs.update({ isSubValid: false }, { where: { subscriberId, isSubValid }, returning: true });
      if (updatedData[0] === 1) return updatedData[1][0];
      throw new AppError("User has already unsubscribed", 404);
    }
    if (isSubValid === null) return await SubSongs.findOne({ where: { subscriberId } });
    return await SubSongs.findOne({ where: { subscriberId, isSubValid } });
  }
  async findSubscriptionById(id: number): Promise<SubSongs | null> {
    return await SubSongs.findByPk(id);
  }
}
