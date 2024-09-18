import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";

export const getAccountInfo = async (id: number) => {
  const userRepo = new UserRepoImp();
  const accountInfo = await userRepo.findUserById(id);

  return accountInfo!;
};
