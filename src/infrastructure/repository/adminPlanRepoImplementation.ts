import { AdminPlan } from "../../domain/entities/AdminPlan";
import { AdminPlanRepository } from "../../domain/interfaces/adminPlanRepository";

export class AdminPlanRepoImp implements AdminPlanRepository {
  async createPlan(plan: AdminPlan): Promise<AdminPlan | null> {
    const { planType, subType, price, benefits } = plan;

    const [itemCreated, isCreated] = await AdminPlan.findOrCreate({ where: { subType, planType }, defaults: { planType, subType, price, benefits } });

    if (isCreated) return itemCreated;
    return null;
  }
  async getAllPlans(): Promise<Array<AdminPlan>> {
    return await AdminPlan.findAll();
  }
  async findPlanById(id: number): Promise<AdminPlan | null> {
    return await AdminPlan.findByPk(id);
  }
  async deletPlanById(id: number): Promise<boolean> {
    const numDeleted = await AdminPlan.destroy({ where: { planId: id } });
    if (numDeleted === 1) return true;
    return false;
  }
  async updatePlanById(id: number, updatedPlan: AdminPlan): Promise<boolean> {
    const { planType, planName, subType, price, benefits } = updatedPlan;
    const [numRows] = await AdminPlan.update({ planType, planName, subType, price, benefits }, { where: { planId: id } });
    if(numRows===1)return true;
    return false;
  }
}
