import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AccountSchema } from "../../schema/accountSchema";
import { encryptPassword } from "../../libs/bcrypt";

export const signUpController = asyncHandler(async (req: Request, res: Response) => {
  console.log("Account creation began ...");
  const { email, password, accountType, phone } = req.body;
  console.log("Checking if remaining neccessary data are present...");
  if (password && accountType) {
    console.log("All data present");

    console.log("Encypting password...");

    const encryptedPassword = await encryptPassword(password);

    console.log("Encyption done");

    console.log("Generating 4 digit verification code");
    const verfCode= Math.floor(Math.random() * 90000) + 1000;

    console.log("Saving data in data in database...");
    const account = await AccountSchema.create({ email, password: encryptedPassword, phone, accountType ,verfCode});
    console.log("Sending verification code....");

    if(account.authorizationMethod==="email"){
        console.log("Sending code through email..");
        // function for sending message with the code through email
    }
    else{
      // function for sending message with the code through phone number
      console.log("Sending code through phone....");
    }

  } else {
    console.log("Not all data is present");
    res.status(400);
    throw new Error("Bad request, some fields in the body was not set");
  }
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {});

export const accountConfirmationController = asyncHandler(async (req: Request, res: Response) => {});

export const resetAccountController = asyncHandler(async (req: Request, res: Response) => {});
