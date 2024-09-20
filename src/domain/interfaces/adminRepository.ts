import { Admin } from "../entities/Admin";

export interface AdminRepository {
  createAdmin(adminData: Admin): Promise<Admin | null>;
  findAdminByEmail(email: string): Promise<Admin | null>;
  findAdminById(id: number): Promise<Admin | null>;
}
