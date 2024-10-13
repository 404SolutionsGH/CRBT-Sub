import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AdminRepoImp } from "../../infrastructure/repository/adminRepoImplementation";
import { AppError } from "../../domain/entities/AppError";

export const isSuperAdminAccount = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.params;
  if (type && type === "sub") next();
  else {
    console.log("Checking if account belongs to a superAdmin..");
    const { id } = req.body;
    const { findAdminById } = new AdminRepoImp();
    const accountInfo = await findAdminById(Number(id));

    if (!accountInfo || accountInfo?.adminType !== "system") throw new AppError("This Account is not authorized to create a service", 401);
    console.log("Account belongs to SuperAdmin");
    next();
  }
});
