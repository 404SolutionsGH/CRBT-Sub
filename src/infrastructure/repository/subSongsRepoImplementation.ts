import { Op } from "sequelize";
import { AppError } from "../../domain/entities/AppError";
import { SubSongs } from "../../domain/entities/SubSongs";
import { SubSongsRepository } from "../../domain/interfaces/subSongsRepository";
import { User } from "../../domain/entities/User";

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
    } else if (isSubValid === null) return await SubSongs.findOne({ where: { subscriberId } });
    return await SubSongs.findOne({ where: { subscriberId, isSubValid } });
  }
  async findSubscriptionById(id: number): Promise<SubSongs | null> {
    return await SubSongs.findByPk(id);
  }

  async findSubscriptionBySongIds(songIds: number[],type:"sub"|"unSub"="sub"): Promise<Array<SubSongs>> {
    if(type==="unSub") return await SubSongs.findAll({ where: { songId: { [Op.in]: songIds }, isSubValid: false }, include: User, attributes: { exclude: ["id", "subscriptionDate", "subscriberId"] } });
    return await SubSongs.findAll({ where: { songId: { [Op.in]: songIds }, isSubValid: true }, include: User, attributes: { exclude: ["id", "unSubscriptionDate", "subscriberId"] } });
  }
}
