import { Admin } from "../../domain/entities/Admin";
import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { encryptPassword } from "../../libs/bcrypt";

export const createAdminAccount = async (adminData: Admin) => {
  const {email,password}=adminData  
  const adminRepo = new AdminRepoImp();
  if (password) {
    console.log("Encrypting password..");
    adminData.password = await encryptPassword(password);
    console.log("Encryption Done");
  }
  if (!(await adminRepo.createAdmin(adminData))) throw new AppError(`Admin account with email ${email} already exist`, 409);
};
