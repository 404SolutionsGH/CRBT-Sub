import { AppError } from "../../domain/entities/AppError";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";

export const isUserAdmin = async (id: number) => {
  const { findAdminById } = new AdminRepoImp();

  const accountInfo = await findAdminById(id);

  if (!accountInfo) throw new AppError("User not authorized to upload song", 401);

  return accountInfo;
};
