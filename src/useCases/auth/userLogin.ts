import { AppError } from "../../domain/entities/AppError";
import { User } from "../../domain/entities/User";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";
import { verifyTokenIdFromFirebase } from "../../libs/firebase";
import { jwtForLogIn } from "../../libs/jwt";

export const userLogin = async (userData: User) => {
  const { createUser, findUserByPhone } = new UserRepoImp();
  let account = await findUserByPhone(userData.phone);
  if (!account) account = await createUser(userData);
  return {account,token:jwtForLogIn(String(account!.id))}
};
