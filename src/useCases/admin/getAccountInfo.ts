import { AppError } from "../../domain/entities/AppError";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";

export const getAdminAccountInfo = async (adminId: number) => {
  const { findAdminById } = new AdminRepoImp();
  const { findPlanById } = new AdminPlanRepoImp();
  const account = await findAdminById(adminId);
  if (!account) throw new AppError("Account info could not be retrived, such account does not exist", 404);
  const { adminType, lastName, firstName, email, nextSubPayment, planId } = account;

  return { adminType, lastName, firstName, email, nextSubPayment, subPlanDetails: await findPlanById(planId) };
};
