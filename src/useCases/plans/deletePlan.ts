import { AppError } from "../../domain/entities/AppError";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";

export const deletePlan = async (planId: number) => {
  const { getAllMerchnatsByPlanId } = new AdminRepoImp();
  const { flagPlanForDeletion, deletPlanById } = new AdminPlanRepoImp();

  // checking if merchants are on this plan
  const allMerchantsOnThisPlan = await getAllMerchnatsByPlanId(planId);
  if (allMerchantsOnThisPlan.length !== 0) {
    await flagPlanForDeletion(planId);
    throw new AppError("Plan deletion failed,but has been flag for automatic deletion later when no one is on it", 409);
  }
  ;
  if (!(await deletPlanById(planId))) throw new AppError("Plan Deletion failed,no such plan exists", 404);
};
