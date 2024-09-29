import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";

export const getAllPlans = async () => {
  const { getAllPlans } = new AdminPlanRepoImp();
  return await getAllPlans();
};
