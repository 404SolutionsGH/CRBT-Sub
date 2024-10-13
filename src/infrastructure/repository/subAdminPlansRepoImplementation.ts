import { Op } from "sequelize";
import { AppError } from "../../domain/entities/AppError";
import { SubAdminPlans } from "../../domain/entities/SubAdminplans";
import { SubadminPlansRepository } from "../../domain/interfaces/subAdminPlansRepository";
import { Admin } from "../../domain/entities/Admin";

export class SubAdminPlansRepoImp implements SubadminPlansRepository {
  async createSubscription(subDetails: SubAdminPlans): Promise<SubAdminPlans> {
    const { price, planId, subscriberId } = subDetails;
    return await SubAdminPlans.create({ price, planId, subscriberId });
  }
  async findSubscriptionsBySubscriberId(subscriberId: number, isSubValid: boolean | null = null, update: boolean = false): Promise<SubAdminPlans | null> {
    if (update) {
      const updatedData = await SubAdminPlans.update({ isSubValid: false }, { where: { subscriberId, isSubValid }, returning: true });
      if (updatedData[0] === 1) return updatedData[1][0];
      throw new AppError("User has already unsubscribed", 404);
    } else if (isSubValid === null) return await SubAdminPlans.findOne({ where: { subscriberId } });
    return await SubAdminPlans.findOne({ where: { subscriberId, isSubValid } });
  }
  async findSubscriptionById(id: number): Promise<SubAdminPlans | null> {
    return await SubAdminPlans.findByPk(id);
  }
  async findSubscriptionByPlanIds(planIds: number[], type: "sub" | "unSub" = "sub"): Promise<Array<SubAdminPlans>> {
    if(type==="unSub") return await SubAdminPlans.findAll({ where: { planId: { [Op.in]: planIds }, isSubValid: false }, include: Admin, attributes: { exclude: ["id", "subscriptionDate", "subscriberId"] } });
    return await SubAdminPlans.findAll({ where: { planId: { [Op.in]: planIds }, isSubValid: true }, include: Admin, attributes: { exclude: ["id", "unSubscriptionDate", "subscriberId"] } });
  }
}
