import { NextFunction, Request, Response } from "express";
import { AccountSchema } from "../schema/accountSchema";
import asyncHandler from "express-async-handler";

export const isSuperAdminAccount = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log("Checking if account belongs to a superAdmin..");
  const { id } = req.body;
  const account = await AccountSchema.findById(id);

  if (account?.accountType === "superAdmin") {
    console.log("Account is a SuperAdmin Account");
    next();
  } else {
    console.log("account is not Super Admin Account");
    res.status(401);
    throw new Error("Not authorized to create service");
  }
});
