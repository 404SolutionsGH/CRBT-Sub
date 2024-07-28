import { NextFunction, Request, Response } from "express";
import { AccountSchema } from "../../schema/accountSchema";
import { tObjectId } from "../../libs/mongoose";
import asyncHandler from "express-async-handler";
import { CrbtServiceSchema } from "../../schema/crbtServiceSchema";

const allowedPlannedType = ["basic", "silver", "gold"];

export const newServiceController = asyncHandler(async (req: Request, res: Response) => {
  console.log("Creating a new Service...");

  const { email, planType, category, serviceName, account } = req.body;

  if (email && planType && category && allowedPlannedType.includes(planType) && account.accountType === "admin" && serviceName) {
    console.log("Checking if account already has a service")
    if(account.service){
         console.log("Account already has a service");
         throw new Error("Account already has a service")
    }
    const newService = await CrbtServiceSchema.create({ ownerId: account._id, planType, serviceName });
    console.log("Service Created");
    console.log("Updating service owner account with with service id..");
    await AccountSchema.updateOne({ _id: account._id }, { $set: { service :newService._id} });
    console.log("Update done");
    res.status(200).json({message:"Service has been created"})

  } else {
    res.status(400);
    throw new Error(
      allowedPlannedType.includes(planType) ? "Invalid data passed for planType in request body" : account.accountType !== "norm" ? "Cannot create service for non admin users" : "Invalid request body"
    );
  }
});
