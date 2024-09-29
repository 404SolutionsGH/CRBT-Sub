import { getCurrentDateYYMMDD, getNextDate } from "../../@common/helperMethods/date";
import { AppError } from "../../domain/entities/AppError";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";

export const subscibeToPlan = async (adminId: number, planId: number) => {
  // confirm payment first(Not yet implemented)
  const { setUpPaymentData } = new AdminRepoImp();
  const { findPlanById } = new AdminPlanRepoImp();

  // check if the admin is already on a plan(Not yet implemented).
  const planDetails = await findPlanById(planId);
  if (!planDetails) throw new AppError(`No plan with this id ${planId} exist`, 404);
  const nextPaymentDay = getNextDate(getCurrentDateYYMMDD(), planDetails.subType);
  // console.log(nextPaymentDay);
  const isPaymentInfoSetup = await setUpPaymentData(planId, nextPaymentDay, adminId);
  if (!isPaymentInfoSetup) throw new AppError("Admin account does not exist", 404);
};
