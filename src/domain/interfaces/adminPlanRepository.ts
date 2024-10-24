import { AdminPlan } from "../entities/AdminPlan";

export interface AdminPlanRepository {
  createPlan(plan: AdminPlan): Promise<AdminPlan | null>;
  getAllPlans(): Promise<Array<AdminPlan>>;
  findPlanById(id: number): Promise<AdminPlan | null>;
  deletPlanById(id: number): Promise<boolean>;
  flagPlanForDeletion(planId: number): Promise<boolean>;
  updatePlanById(id: number, updatedPlan: AdminPlan): Promise<AdminPlan | null>;
}
