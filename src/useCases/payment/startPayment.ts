import dotenv from "dotenv";
dotenv.config();
import { AppError } from "../../domain/entities/AppError";
import { Transaction } from "../../domain/entities/Transactions";
import { AdminPlanRepoImp } from "../../infrastructure/repository/adminPlanRepoImplementation";
import { TransactionRepoImpl } from "../../infrastructure/repository/transactionRepoImplementation";
import { paymentRequest } from "../../libs/axios";
import { jwtForPayment } from "../../libs/jwt";

export const startPayment = async (transactionInfo: Transaction, phoneNumber: string) => {
  const { findPlanById } = new AdminPlanRepoImp();
  const { createTransaction } = new TransactionRepoImpl();
  const planDetails = await findPlanById(transactionInfo.planId);
  if (!planDetails) throw new AppError("No plan with this id exists", 404);
  const { price } = planDetails;
  // create transaction
  const transDetails = await createTransaction(transactionInfo);
  const txRef = jwtForPayment(String(transDetails.id));
  const callBackUrl = `${process.env.BackendBaseUrl}/payments/confirm`;
  const returnUrl = `${process.env.BackendBaseUrl}/payments/success`;
  const url = await paymentRequest({ amount: price, currency: "ETB", phoneNumber, txRef, callBackUrl, returnUrl });
  if (!url) throw new AppError("Something is wrong with the provided payment info please chack and try again", 400);
  return url;
};
