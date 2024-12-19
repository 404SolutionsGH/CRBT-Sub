import { AppError } from "../../domain/entities/AppError";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { RewardRepoImpl } from "../../infrastructure/repository/rewardRepoImplementation";

export const getAdminAccountInfo = async (adminId: number) => {
  const { findAdminById } = new AdminRepoImp();
  const { findPlanById } = new AdminPlanRepoImp();
  const { get } = new RewardRepoImpl();
  const account = await findAdminById(adminId);
  if (!account) throw new AppError("Account info could not be retrived, such account does not exist", 404);
  const rewardInfo = await get(adminId);
  const { adminType, lastName, firstName, email, nextSubPayment, planId, createdAt,profile } = account;
  return { adminType, lastName, firstName, email, profile,nextSubPayment, createdAt, subPlanDetails: await findPlanById(planId), rewardPoints: rewardInfo ? rewardInfo.points : 0 };
};
