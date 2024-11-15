import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { startPayment } from "../../useCases/payment/startPayment";
import { Transaction } from "../../domain/entities/Transactions";
import { AppError } from "../../domain/entities/AppError";
import { confirmPayment } from "../../useCases/payment/confirmPayment";

export const startPaymentController = asyncHandler(async (req: Request, res: Response) => {
  const { email, planId, phoneNumber } = req.body;
  if (!planId || !phoneNumber || typeof phoneNumber !== "string") throw new AppError(!planId ? "No data passed for planId or phoneNumber" : "phoneNumber must be a string", 400);
  const checkOutPageUrl = await startPayment(Transaction.build({ email, planId }), phoneNumber);
  res.status(200).json({checkoutUrl:checkOutPageUrl})
});

export const sucessfullPaymentController = asyncHandler(async (req: Request, res: Response) => {
  res.redirect("http://crbtmusicpro.com");
});

export const confirmPaymentController = asyncHandler(async (req: Request, res: Response) => {
  const { event, tx_ref, status } = req.body;
  if (event === "charge.success" && status === "success") await confirmPayment(tx_ref);
  res.status(200).send(200);
});
