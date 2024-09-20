import { AppError } from "../../domain/entities/AppError";
import { UserRepoImp } from "../../infrastructure/repository/userRepoImplemtation";
import { verifyTokenIdFromFirebase } from "../../libs/firebase";
import { jwtForLogIn } from "../../libs/jwt";

export const userLogin = async (firebaseToken: string, phone: string) => {
  const userRepo = new UserRepoImp();
  try {
    const { phone_number } = await verifyTokenIdFromFirebase(firebaseToken);
    if (!phone_number || phone_number !== phone) throw new AppError("Firebase Id verification failed,check idFromFirebase in request body", 401);
  } catch (error) {
    throw new AppError((error as Error).message, 400);
  }
  const account = await userRepo.findUserByPhone(phone);
  if (account) return jwtForLogIn(String(account!.id));
  throw new AppError(`No user acccount with ${phone} exists`, 404);
};
