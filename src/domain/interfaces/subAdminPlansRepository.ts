import { SubAdminPlans } from "../entities/SubAdminplans";

export interface SubadminPlansRepository {
  createSubscription(subDetails: SubAdminPlans): Promise<SubAdminPlans>;
  findSubscriptionsBySubscriberId(subscriberId: number, isSubValid: boolean | null, update: boolean): Promise<SubAdminPlans | null>;
  findSubscriptionById(id: number): Promise<SubAdminPlans | null>;
  findSubscriptionByPlanIds(planIds: number[], type: "sub" | "unSub"): Promise<Array<SubAdminPlans>>;
}
