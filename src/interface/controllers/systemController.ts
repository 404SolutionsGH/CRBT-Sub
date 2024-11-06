import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { updateChapaSecreteKey, updateSystemStatus } from "../../useCases/admin/updateSystemInfo";

export const systemStatusController = asyncHandler(async (req: Request, res: Response) => {
  const { id, status } = req.body;
  await updateSystemStatus(id, status);
  res.status(200).json({ message: "System updated sucessfully" });
});

export const chapaSecretController = asyncHandler(async (req: Request, res: Response) => {
  const { id, secretKey } = req.body;
  await updateChapaSecreteKey(id, secretKey);
  res.status(200).json({ message: "System updated sucessfully" });
});
