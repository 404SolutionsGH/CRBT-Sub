import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";

export const getAdminPlan = async (planId: number) => {
  const { findPlanById } = new AdminPlanRepoImp();
  return await findPlanById(planId);
};
