import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { isRequestFromSuperAdmin } from "../../@common/helperMethods/checkAccountType";
import { AppError } from "../../domain/entities/AppError";

export const isSuperAdminAccount = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.params;
  if (type && type === "sub") next();
  else {
    console.log("Checking if account belongs to a superAdmin..");
    const { id } = req.body;
    if (!(await isRequestFromSuperAdmin(id))) throw new AppError("This Account is not authorized to create a service", 401);
    next();
  }
});
