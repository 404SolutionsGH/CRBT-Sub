import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { verifyPassword } from "../../libs/bcrypt";
import { jwtForLogIn } from "../../libs/jwt";

export const adminLogin = async (email: string, pasword: string) => {
  const adminRepo = new AdminRepoImp();
  const account = await adminRepo.findAdminByEmail(email);
  if (account) {
    if (!(await verifyPassword(pasword, account.password))) throw new AppError("Invalid email and password", 401);
    return jwtForLogIn(String(account.id));
  }
  throw new AppError(`No admin account with ${email} exist`, 404);
};
