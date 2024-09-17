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
}
