import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/entities/AppError";
import { createAdminPlan } from "../../useCases/plans/createAdminPlan";
import { AdminPlan } from "../../domain/entities/AdminPlan";
import { getAllPlans } from "../../useCases/plans/getAllPlans";
import { subscibeToPlan } from "../../useCases/plans/subcribePlan";

// helper methods and class
interface Benefits {
  songLimit: number;
}
const validateBenefitsObj = (beneFitsObj: Benefits) => {
  const { songLimit } = beneFitsObj;
  if (!songLimit) throw new AppError("benefits object lacks the field songLimit", 400);
  //   future validations can come here
};

const checkIdValidy = (id: string) => {
  const alphaReg = /[a-zA-Z]/;
  const decimalReg = /\./;
  if (alphaReg.test(id)) {
    throw new AppError("Item id must be an integer not a character or alphanumeric characters", 400);
  } else if (decimalReg.test(id)) {
    throw new AppError("Item id must be an integer not decimal", 400);
  }
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
  const numRegExp = RegExp('^\d+$');

  checkIdValidy(planId)
  await subscibeToPlan(id, Number(planId));

  res.status(201).json({ message: "Subscribtion sucessfull" });
});