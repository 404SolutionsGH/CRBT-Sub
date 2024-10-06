import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/entities/AppError";
import { createAdminPlan } from "../../useCases/plans/createAdminPlan";
import { AdminPlan } from "../../domain/entities/AdminPlan";
import { getAllPlans } from "../../useCases/plans/getAllPlans";
import { subscibeToPlan } from "../../useCases/plans/subcribePlan";
import { isStringContentNumber } from "../../@common/helperMethods/isStringNumber";

// helper methods and class
interface Benefits {
  songLimit: number;
  subscriberLimit: number;
  numberOfSongsPerUpload: number;
}
const validateBenefitsObj = (beneFitsObj: Benefits) => {
  const { songLimit, subscriberLimit, numberOfSongsPerUpload } = beneFitsObj;
  if (!songLimit && typeof songLimit !== "number") throw new AppError(!songLimit ? "benefits object lacks the field songLimit" : "songLimit must be a number", 400);
  else if (!subscriberLimit && typeof subscriberLimit !== "number") throw new AppError(!subscriberLimit ? "benefits object lacks the field subscriberLimit" : "subscribersLimit must be a number", 400);
  else if (!numberOfSongsPerUpload && typeof numberOfSongsPerUpload !== "number") throw new AppError(!numberOfSongsPerUpload ? "benefits object lacks the field  numberOfSongsPerUpload" : "numberOfSongsPerUpload must be number", 400);
  //   future validations can come here
};



export const createPlanController = asyncHandler(async (req: Request, res: Response) => {
  const { planType, price, subType, benefits } = req.body;
  if (!planType || !subType || !benefits) throw new AppError(!planType ? "No data passed for planType" : !benefits ? "No data passed for benefits" : "No data passed for subType", 400);
  validateBenefitsObj(benefits);
  await createAdminPlan(AdminPlan.build({ planType, price, subType, benefits }));
  res.status(200).json({ message: "Plan has been created sucessfully" });
});

export const getAllPlansController = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ allPlans: await getAllPlans() });
});

export const planSubcriptionController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  const { planId } = req.params;
  const numRegExp = RegExp("^d+$");

  isStringContentNumber(planId,"planId")
  await subscibeToPlan(id, Number(planId));

  res.status(201).json({ message: "Subscribtion sucessfull" });
});
