import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AccountSchema } from "../schema/accountSchema";

export const checkingForAccount = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log("Client data received.Checking if it exist in database....");
  const { email, phone, accountType } = req.body;

  if ((phone && accountType === "admin") || accountType === "superAdmin") {
    // console.log("Checking if recieved data exists in database(Accont creation)...");
    // let account = await AccountSchema.find({ email });

    // if (account.length !== 0) {
    //   console.log("Account with this email exist");
    //   throw new Error("An account with this email already exist");
    // }

    const account = await AccountSchema.find({ phone });

    if (account.length !== 0) {
      console.log("Account with this phone number exist");
      throw new Error("An account with this phone number already exist");
    }
  } else if (phone && accountType === "norm") {
    const account = await AccountSchema.find({ phone });

    if (account.length !== 0) {
      console.log("Account with this phone number exist");
      throw new Error("An account with this phone number already exist");
    }
  } else if (phone) {
    console.log("Checking if recieved data exists in database...");
    const account =  await AccountSchema.find({ phone });
    if (account.length === 0) {
      console.log("Account with this email or phone number does not exist");
      throw new Error("No account with this  phone exist");
    } else {
      console.log("Account exist");
      req.body.account = account[0];
    }
  } else {
    res.status(400);
    throw new Error("Bad request invalid request body");
  }
  next();
});
