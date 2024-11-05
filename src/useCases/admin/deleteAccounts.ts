import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";

export const deleteUserAccount = async (userId: number) => {
  const { deleteAccount } = new UserRepoImp();
  if (!(await deleteAccount(userId))) throw new AppError("Deletion Failed no account with this id exist", 404);
};

export const deleteMerchantAccount = async (merchantId: number) => {
  const { deleteAccount } = new AdminRepoImp();
  if (!(await deleteAccount(merchantId))) throw new AppError("Deletion Failed no account with this id exist", 404);
};
