import { where } from "sequelize";
import { Admin } from "../../domain/entities/Admin";
import { AppError } from "../../domain/entities/AppError";
import { AdminRepository } from "../../domain/interfaces/adminRepository";

export class AdminRepoImp implements AdminRepository {
  async createAdmin(adminData: Admin): Promise<Admin | null> {
    const { email, password, firstName, lastName, adminType } = adminData;
    const [itemCreated, isCreated] = await Admin.findOrCreate({
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
}
