import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/entities/AppError";
import { getAllUsers, getSubUsers } from "../../useCases/admin/getUsers";
import { getAllMerch, getSubMerch } from "../../useCases/admin/getMerchants";

export const getUsersController = asyncHandler(async (req: Request, res: Response) => {
  const { type } = req.params;
  const { id } = req.body;
  let users: any;
  if (type === "all") {
    users = await getAllUsers();
  } else if (type === "sub" || type === "unSub") {
    users = await getSubUsers(id, type);
  } else throw new AppError("Invalid value passed for type url parameter value should be either all or sub", 400);
  res.status(200).json(users);
});

export const getMerchantsController = asyncHandler(async (req: Request, res: Response) => {
  const { cat } = req.params;
  let merchants: any;
  if (cat === "all") {
    merchants = await getAllMerch();
  } else if (cat === "sub" || cat === "unSub") {
    merchants = await getSubMerch(cat);
  } else throw new AppError("Invalid value passed for cat url parameter value should be either all or sub", 400);
  res.status(200).json(merchants);
});
