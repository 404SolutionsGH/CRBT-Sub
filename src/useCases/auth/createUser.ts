import { AppError } from "../../domain/entities/AppError";
import { User } from "../../domain/entities/User";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";
import { jwtForLogIn } from "../../libs/jwt";

export const createUserAccount = async (userData: User) => {
  const userRepo = new UserRepoImp();
  const account = await userRepo.createUser(userData);
  if (account) return jwtForLogIn(String(account.id));

  throw new AppError(`Account with this phone number ${userData.phone} already exist`, 409);
};
