import { Admin } from "../../domain/entities/Admin";
import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { RoleRepoImpl } from "../../infrastructure/repository/roleRepositoryImplementation";
import { encryptPassword } from "../../libs/bcrypt";
import { sendAccountPassword } from "../../libs/nodeMailer";

export const createSystemAdmins = async (accountData: Admin) => {
   const {password}=accountData 
  const { findByName } = new RoleRepoImpl();
  const { createAdmin } = new AdminRepoImp();
  if (!(await findByName(accountData.role!))) throw new AppError(`No role with name: ${accountData.role} exists`, 404);
  else if (accountData.password) {
    console.log("Encrypting password..");
    accountData.password = await encryptPassword(accountData.password);
    console.log("Encryption Done");
  }
  if (!(await createAdmin(accountData))) throw new AppError("An account with this email already exists", 409);
  await sendAccountPassword(password,accountData.email)
};
