import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { encryptPassword, verifyPassword } from "../../libs/bcrypt";
import { updateAccountInfo } from "../../useCases/user/updateAccountInfo";
import { User } from "../../domain/entities/User";
import { AppError } from "../../domain/entities/AppError";
import { getAccountInfo } from "../../useCases/user/getAccountInfo";

export const accountUpdateController = asyncHandler(async (req: Request, res: Response) => {
  console.log("User updating account info....");
  const { firstName, lastName, id } = req.body;

  if (typeof firstName !== "string" || typeof lastName !== "string")
    throw new AppError(typeof firstName !== "string" ? "Value for firstName should be a string" : "Value for lastName should be a string", 400);

  const wasDataUpdated = await updateAccountInfo(User.build({ firstName, lastName, id }));

  if (!wasDataUpdated) {
    throw new AppError("No data passed in the request to be used for the update", 400);
  }
  res.status(200).json({ message: "Account updated" });
});

export const accountInfoController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;

  const { firstName, lastName, accountBalance, phone, langPref, subService, unSubService } = await getAccountInfo(Number(id));

  res.status(200).json({ firstName, lastName, accountBalance, phone, langPref,subService,unSubService });
});
