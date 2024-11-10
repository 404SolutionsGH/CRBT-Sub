import { RewardRepoImpl } from "../../infrastructure/repository/rewardRepoImplementation";



export const getRewardInfoOfAccounts = async (accountType: "user" | "admin") => {
const {getAll}= new RewardRepoImpl()
return await getAll(accountType)
};