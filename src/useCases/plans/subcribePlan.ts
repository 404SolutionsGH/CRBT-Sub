import { event } from "../../@common/constants/objects";
import { getCurrentDateYYMMDD, getNextDate } from "../../@common/helperMethods/date";
import { AppError } from "../../domain/entities/AppError";
import { Reward } from "../../domain/entities/Reward";
import { SubAdminPlans } from "../../domain/entities/SubAdminplans";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { SubAdminPlansRepoImp } from "../../infrastructure/repository/subAdminPlansRepoImplementation";

export const subscibeToPlan = async (adminId: number, planId: number) => {
  // confirm payment first(Not yet implemented)
  const { setUpPaymentData } = new AdminRepoImp();
  const { findPlanById } = new AdminPlanRepoImp();
  const { createSubscription } = new SubAdminPlansRepoImp();

  // check if the admin is already on a plan(Not yet implemented).
  const planDetails = await findPlanById(planId);
  if (!planDetails) throw new AppError(`No plan with this id ${planId} exist`, 404);
  if (planDetails.deleteFlag) throw new AppError("Cannot subscribe to plan which is flaged for deletion", 401);
  const nextPaymentDay = getNextDate(getCurrentDateYYMMDD(), planDetails.subType);
  // console.log(nextPaymentDay);
  const isPaymentInfoSetup = await setUpPaymentData(planId, nextPaymentDay, adminId);
  if (!isPaymentInfoSetup) throw new AppError("Admin account does not exist", 404);
  // saving subscrition data
  await createSubscription(SubAdminPlans.build({ price: planDetails.price, planId, subscriberId: adminId }));
  event.emit("updateRewardPoints",Reward.build({accountId:adminId,accountType:"admin"}));
};

