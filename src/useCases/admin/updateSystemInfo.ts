import { System } from "../../domain/entities/System";
import { SystemRepoImpl } from "../../infrastructure/repository/systemRepoImplementation";

const { setSystemStatus, setChapaSecretKey, updateRewardData} = new SystemRepoImpl();
export const updateSystemStatus = async (adminId: number, status: "Maintainance" | "Active") => {
  await setSystemStatus(status, adminId);
};

export const updateChapaSecreteKey = async (adminId: number, secretKey: string) => {
  await setChapaSecretKey(secretKey, adminId);
};

export const updateReward= async (rewardData:System)=>{
await updateRewardData(rewardData);
}