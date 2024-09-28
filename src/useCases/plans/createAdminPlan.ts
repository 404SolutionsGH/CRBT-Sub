import { AdminPlan } from "../../domain/entities/AdminPlan";
import { AppError } from "../../domain/entities/AppError";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";

export const createAdminPlan = async (planData: AdminPlan) => {
  const { createPlan } = new AdminPlanRepoImp();
  const createdPlan = await createPlan(planData);
  if (!createdPlan) throw new AppError("This plan already exists", 409);
};
