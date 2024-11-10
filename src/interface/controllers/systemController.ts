import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { updateChapaSecreteKey, updateReward, updateSystemStatus } from "../../useCases/admin/updateSystemInfo";
import { System } from "../../domain/entities/System";

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


export const rewardDataController=  asyncHandler(async (req: Request, res: Response) => {
const { id, minimumPointsToWithdraw, pointsToReward } = req.body;
await updateReward(System.build({ minimumPointsToWithdraw, pointsToReward ,adminId:id}));
res.status(200).json({message:"Data updated sucessfully"})
})
