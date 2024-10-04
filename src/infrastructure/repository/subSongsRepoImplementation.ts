import { SubSongs } from "../../domain/entities/SubSongs";
import { subSongsRepository } from "../../domain/interfaces/subSongsRepository";

export class SubSongsRepoImp implements subSongsRepository {
  async createSubscription(subDetails: SubSongs): Promise<SubSongs> {
    const { price, songOwnerId, subscriberId } = subDetails;
    return await SubSongs.create({ price, songOwnerId, subscriberId });
  }
  async findSubscriptionsByOwnerId(ownerId: number): Promise<SubSongs | null> {
    return await SubSongs.findOne({ where: { songOwnerId: ownerId } });
  }
  async findSubscriptionById(id: number): Promise<SubSongs | null> {
    return await SubSongs.findByPk(id);
  }
}
