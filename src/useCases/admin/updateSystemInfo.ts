import { SystemRepoImpl } from "../../infrastructure/repository/systemRepoImplementation";

const { setSystemStatus, setChapaSecretKey, } = new SystemRepoImpl();
export const updateSystemStatus = async (adminId: number, status: "Maintaince" | "Active") => {
  await setSystemStatus(status, adminId);
};

export const updateChapaSecreteKey = async (adminId: number, secretKey: string) => {
  await setChapaSecretKey(secretKey, adminId);
};
