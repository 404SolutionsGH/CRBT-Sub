import { where } from "sequelize";
import { Admin } from "../../domain/entities/Admin";
import { AppError } from "../../domain/entities/AppError";
import { AdminRepository } from "../../domain/interfaces/adminRepository";

export class AdminRepoImp implements AdminRepository {
  async createAdmin(adminData: Admin): Promise<Admin | null> {
    const { email, password, firstName, lastName, adminType ,role} = adminData;
    const [itemCreated, isCreated] = role
      ? await Admin.findOrCreate({
          where: { email },
          defaults: {
            email,
            password,
            firstName,
            lastName,
            adminType,
            role
          },
        })
      : await Admin.findOrCreate({
          where: { email },
          defaults: {
            email,
            password,
            firstName,
            lastName,
            adminType,
          },
        });

    if (isCreated) return itemCreated;
    return null;
  }
  async findAdminByEmail(email: string): Promise<Admin | null> {
    return await Admin.findOne({ where: { email } });
  }
  async findAdminById(id: number): Promise<Admin | null> {
    return await Admin.findByPk(id);
  }

  async setUpPaymentData(planId: number, nextSubPayment: string, id: number): Promise<boolean> {
    const [numOfRows] = await Admin.update({ planId, nextSubPayment }, { where: { id } });
    if (numOfRows == 1) return true;

    return false;
  }

  async getAllMerchants(): Promise<Admin[]> {
    return await Admin.findAll({ where: { adminType: "merchant" } });
  }

  async updateAdminAccount(updatedInfo: Admin): Promise<Admin | null> {
    const { firstName, lastName, email, id, password } = updatedInfo;
    const updatedData = password ? await Admin.update({ password }, { where: { id }, returning: true }) : await Admin.update({ firstName, lastName, email }, { where: { id }, returning: true });
    if (updatedData[0] === 1) return updatedData[1][0];
    return null;
  }

  async getAllMerchnatsByPlanId(planId: number): Promise<Admin[]> {
    return await Admin.findAll({ where: { adminType: "merchant", planId } });
  }

  async deleteAccount(accountId: number): Promise<boolean> {
    const numOfDeleted = await Admin.destroy({ where: { id: accountId } });
    if(numOfDeleted!==0)return true
    return false;
  }
}
