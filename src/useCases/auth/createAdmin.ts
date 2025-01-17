import { Admin } from "../../domain/entities/Admin";
import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { encryptPassword } from "../../libs/bcrypt";
import { sendAccountCreationEmail, sendAccountPassword } from "../../libs/nodeMailer";
import { subscibeToPlan } from "../plans/subcribePlan";

export const createAdminAccount = async (adminData: Admin, planId: number, isSuperAdmin: boolean = false) => {
  const { email, password, firstName } = adminData;
  const adminRepo = new AdminRepoImp();
  if (password) {
    console.log("Encrypting password..");
    adminData.password = await encryptPassword(password);
    console.log("Encryption Done");
  }
  const account = await adminRepo.createAdmin(adminData);
  if (!account) throw new AppError(`Admin account with email ${email} already exist`, 409);
  console.log("Subscribing merchants to a plan..");
  await sendAccountCreationEmail(email, firstName);
  if (isSuperAdmin) {
    await subscibeToPlan(account.id, planId, "", true);
    await sendAccountPassword(password, email);
  }
};
