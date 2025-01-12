import { Admin } from "../../domain/entities/Admin";
import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { encryptPassword, verifyPassword } from "../../libs/bcrypt";

export const changePassword = async (newPasswword: string, oldPassword: string, adminId: number) => {
  const { findAdminById, updateAdminAccount } = new AdminRepoImp();
  const accountInfo = await findAdminById(adminId);
  if (!accountInfo) throw new AppError("Password change failed , nosuch account exist", 404);
  if (await verifyPassword(oldPassword, accountInfo.password)) {
    const password = await encryptPassword(newPasswword);
    await updateAdminAccount(Admin.build({ password ,id:adminId}));
  } else {
    throw new AppError("The old password you entered is incorrect. Please try again.", 401);
  }
};
