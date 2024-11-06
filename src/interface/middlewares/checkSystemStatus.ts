import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { SystemRepoImpl } from "../../infrastructure/repository/systemRepoImplementation";

export const checkSystemStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { getSystemStatus } = new SystemRepoImpl();
  const systemStatus = await getSystemStatus(undefined);
  if (systemStatus === "Active") {
    next();
  } else {
    res.status(503).json({ message: "System is currently under maintaince" });
  }
});
