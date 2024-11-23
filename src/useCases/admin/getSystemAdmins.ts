import { Admin } from "../../domain/entities/Admin";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";

export const getSystemAdmins = async (): Promise<Admin[]> => {
  const { getAllSystemAdmins } = new AdminRepoImp();
  return await getAllSystemAdmins();
};
