import { AdminPlan } from "../../domain/entities/AdminPlan";
import { AdminPlanRepository } from "../../domain/interfaces/adminPlanRepository";

export class AdminPlanRepoImp implements AdminPlanRepository {
  async createPlan(plan: AdminPlan): Promise<AdminPlan | null> {
    const { planType, subType, price, benefits, planPoints } = plan;

    const [itemCreated, isCreated] = planPoints
      ? await AdminPlan.findOrCreate({ where: { subType, planType }, defaults: { planType, subType, price, benefits, planPoints } })
      : await AdminPlan.findOrCreate({ where: { subType, planType }, defaults: { planType, subType, price, benefits } });

    if (isCreated) return itemCreated;
    return null;
  }
  async getAllPlans(): Promise<Array<AdminPlan>> {
    return await AdminPlan.findAll({ where: { deleteFlag: false } });
  }
  async findPlanById(id: number): Promise<AdminPlan | null> {
    return await AdminPlan.findByPk(id);
  }
  async deletPlanById(id: number): Promise<boolean> {
    const numDeleted = await AdminPlan.destroy({ where: { planId: id } });
    if (numDeleted === 1) return true;
    return false;
  }

  async flagPlanForDeletion(planId: number): Promise<boolean> {
    const [numRows] = await AdminPlan.update({ deleteFlag: true }, { where: { planId } });
    if (numRows === 1) return true;
    return false;
  }
  async updatePlanById(id: number, updatedPlan: AdminPlan): Promise<AdminPlan | null> {
    const { planType, planName, subType, price, benefits, planPoints } = updatedPlan;
    const [numRows, affectedRows] = await AdminPlan.update({ planType, planName, subType, price, benefits, planPoints }, { where: { planId: id }, returning: true });
    if (numRows === 1) return affectedRows[0];
    return null;
  }
}
