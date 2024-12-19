import { Admin } from "../../domain/entities/Admin";
import { AppError } from "../../domain/entities/AppError";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { RoleRepoImpl } from "../../infrastructure/repository/roleRepositoryImplementation";
import { encryptPassword } from "../../libs/bcrypt";

export const updateAdminAccountInfo = async (updatedInfo: Admin) => {
  const { password, planId, role } = updatedInfo;
  const { updateAdminAccount } = new AdminRepoImp();
  const { findPlanById } = new AdminPlanRepoImp();
  const { findByName } = new RoleRepoImpl();
  if (password) {
    updatedInfo.password = await encryptPassword(password);
  }

  if (planId && !(await findPlanById(planId ? planId : 0))) {
    throw new AppError("No plan with such id exists.", 404);
  }

  if (role && !(await findByName(role ? role : ""))) {
    throw new AppError("No role with such name exists.", 404);
  }

  const updatedAccount = await updateAdminAccount(updatedInfo);
  if (!updatedAccount) throw new AppError("Account update failed,no such account exist", 404);
  const { firstName, lastName, email, profile } = updatedAccount;
  return { firstName, lastName, email, profile };
};
