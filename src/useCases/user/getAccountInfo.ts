import { ServiceRepoImp } from "../../infrastructure/repository/serviceRepoImplementation";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";

export const getAccountInfo = async (id: number) => {
  const userRepo = new UserRepoImp();
  const serviceRepo = new ServiceRepoImp();
  const accountInfo = await userRepo.findUserById(id);
  const { firstName, lastName, accountBalance, phone, langPref, subService } = accountInfo!;
  const unSubService = await serviceRepo.findServiceWithIds(accountInfo!.unSubService);
  return { firstName, lastName, accountBalance, phone, langPref, subService, unSubService };
};
