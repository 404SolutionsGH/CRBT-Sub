import { AdminPlan } from "../../domain/entities/AdminPlan";
import { AppError } from "../../domain/entities/AppError";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";

export const updateAdminPlan = async (updatedPlan: AdminPlan) => {
  const { updatePlanById } = new AdminPlanRepoImp();
  const updatedData = await updatePlanById(updatedPlan.planId, updatedPlan);

  if (!updatedData) throw new AppError("Update failed,no such merchant plan exist", 404);

  const { planType, planName, subType, price, benefits } = updatedData;
  return { planType, planName, subType, price, benefits };
};
