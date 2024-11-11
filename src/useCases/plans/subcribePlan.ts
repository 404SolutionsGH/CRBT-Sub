import { event } from "../../@common/constants/objects";
import { getCurrentDateYYMMDD, getNextDate } from "../../@common/helperMethods/date";
import { AppError } from "../../domain/entities/AppError";
import { Reward } from "../../domain/entities/Reward";
import { SubAdminPlans } from "../../domain/entities/SubAdminplans";
import { Transaction } from "../../domain/entities/Transactions";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { SubAdminPlansRepoImp } from "../../infrastructure/repository/subAdminPlansRepoImplementation";
import { startPayment } from "../payment/startPayment";

export const subscibeToPlan = async (adminId: number, planId: number, phone: string, isSuperAdmin: boolean = false) => {
  // confirm payment first(Not yet implemented)
  const { setUpPaymentData, findAdminById } = new AdminRepoImp();
  const { findPlanById } = new AdminPlanRepoImp();
  const { createSubscription } = new SubAdminPlansRepoImp();

  // check if the admin is already on a plan(Not yet implemented).
  const planDetails = await findPlanById(planId);
  if (!planDetails) throw new AppError(`No plan with this id ${planId} exist`, 404);
  if (planDetails.deleteFlag) throw new AppError("Cannot subscribe to plan which is flaged for deletion", 401);

  const accountInfo = await findAdminById(adminId);
  if (!accountInfo) throw new AppError("Admin account does not exist", 404);
  // initialise payment process
  let checkOutPageLink = "";
  if (isSuperAdmin) {
    const nextPaymentDay = getNextDate(getCurrentDateYYMMDD(), planDetails.subType);
    await setUpPaymentData(planId, nextPaymentDay, adminId);
  } else {
    checkOutPageLink = await startPayment(Transaction.build({ email: accountInfo.email, planId }), phone);
  }

  // saving subscrition data
  await createSubscription(SubAdminPlans.build({ price: planDetails.price, planId, subscriberId: adminId }));
  event.emit("updateRewardPoints", Reward.build({ accountId: adminId, accountType: "admin" }));

  return checkOutPageLink;
};
