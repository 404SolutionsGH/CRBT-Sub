import { Reward } from "../../domain/entities/Reward";
import { RewardRepository } from "../../domain/interfaces/rewardRespository";

export class RewardRepoImpl implements RewardRepository {
  async get(accountId: number): Promise<Reward | null> {
    return await Reward.findOne({ where: { accountId } });
  }
  async createOrUpdate(rewardData: Reward): Promise<void> {
    const { accountId, accountType, points, email, phone } = rewardData;
    await Reward.upsert({ accountId, accountType, points, email, phone });
  }
  async getAll(accountType: "user" | "admin"): Promise<Reward[]> {
    return await Reward.findAll({where:{accountType}});
  }
}
