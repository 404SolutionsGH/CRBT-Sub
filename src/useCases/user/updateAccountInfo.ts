import { User } from "../../domain/entities/User";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";

export const updateAccountInfo = async (updatedInfo: User) => {
  const userRepo = new UserRepoImp();
  return await userRepo.updateAccountInfo(updatedInfo);
};
