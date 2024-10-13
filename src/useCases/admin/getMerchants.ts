import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { SubAdminPlansRepoImp } from "../../infrastructure/repository/subAdminPlansRepoImplementation";

export const getAllMerch = async () => {
  const { getAllMerchants } = new AdminRepoImp();
  return await getAllMerchants();
};
export const getSubMerch = async (type:"sub"|"unSub") => {
  const { getAllPlans } = new AdminPlanRepoImp();
  const { findSubscriptionByPlanIds } = new SubAdminPlansRepoImp();
  const allPlans = await getAllPlans();
  if (allPlans.length === 0) return [];
  const allPanIds: number[] = [];
  allPlans.forEach((plan) => {
    allPanIds.push(plan.planId);
  });
  return await findSubscriptionByPlanIds(allPanIds,type);
};
