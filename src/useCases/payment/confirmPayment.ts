import { getCurrentDateYYMMDD, getNextDate } from "../../@common/helperMethods/date";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { TransactionRepoImpl } from "../../infrastructure/repository/transactionRepoImplementation";
import { verifyToken } from "../../libs/jwt";

export const confirmPayment = async (txRef: string) => {
  const { findTransactionById } = new TransactionRepoImpl();
  const { setUpPaymentData, findAdminByEmail } = new AdminRepoImp();
  const { findPlanById } = new AdminPlanRepoImp();
  const txId = (await verifyToken(txRef)).transcId;
  if (txId) {
    const transcDetails = await findTransactionById(Number(txId));
    if (transcDetails) {
      const { id } = (await findAdminByEmail(transcDetails.email))!;
      const { subType, planId } = (await findPlanById(transcDetails.planId))!;
      await setUpPaymentData(planId, getNextDate(getCurrentDateYYMMDD(), subType), id);
      console.log(`Transaction ${txRef} has been confirmed.`);
    }
  }
};
