import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { updateChapaSecreteKey, updatePointSettings, updateSystemStatus } from "../../useCases/admin/updateSystemInfo";
import { System } from "../../domain/entities/System";
import { AppError } from "../../domain/entities/AppError";

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


export const pointSettingsController=  asyncHandler(async (req: Request, res: Response) => {
const { id, songPoints,minimumWithdraw} = req.body;
if(!songPoints||!minimumWithdraw)throw new AppError("No value was passed for either songPoints or minimumWithdraw", 400);
await updatePointSettings(System.build({ pointSettings:{songPoints,minimumWithdraw}, adminId: id }));
res.status(200).json({message:"Data updated sucessfully"})
})
