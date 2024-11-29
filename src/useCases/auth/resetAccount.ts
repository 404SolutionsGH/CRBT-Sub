import { RandomData } from "../../@common/helperMethods/randomData";
import { Admin } from "../../domain/entities/Admin";
import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { encryptPassword } from "../../libs/bcrypt";
import { sendAccountResetEmail } from "../../libs/nodeMailer";

export const resetAccount = async (email: string) => {
  const { findAdminByEmail, updateAdminAccount } = new AdminRepoImp();
  const accountInfo = await findAdminByEmail(email);
  if (!accountInfo) throw new AppError(`No account with email ${email} exist.`, 404);
  const newPassword = new RandomData().getRandomString(7);
  await updateAdminAccount(Admin.build({ password: await encryptPassword(newPassword) }));
  console.log("Sending Acount Reset Email");
  await sendAccountResetEmail(accountInfo.firstName, newPassword, email);
  console.log("Email sent");
};
