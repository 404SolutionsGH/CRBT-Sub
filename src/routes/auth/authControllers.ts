import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AccountSchema } from "../../schema/accountSchema";
import { encryptPassword } from "../../libs/bcrypt";
import { sendAccountConfirmationEmail } from "../../libs/nodeMailer";
import { sendAccountConfirmationSms } from "../../libs/axios";

export const signUpController = asyncHandler(async (req: Request, res: Response) => {
  console.log("Account creation began ...");
  const { email, password, accountType, phone, username } = req.body;
  console.log("Checking if remaining neccessary data are present...");
  if (password && accountType && username) {
    console.log("All data present");

    console.log("Encypting password...");

    const encryptedPassword = await encryptPassword(password);

    console.log("Encyption done");

    console.log("Generating 4 digit verification code");
    const verfCode = Math.floor(Math.random() * 9000) + 1000;

    console.log("Saving data in data in database...");
    const account = await AccountSchema.create({ email, password: encryptedPassword, phone, accountType, verfCode, username });
    console.log("Sending verification code....");

    if (account.authorizationMethod === "email") {
      console.log("Sending code through email..");
      // function for sending message with the code through email
      await sendAccountConfirmationEmail(verfCode, username, email);
    } else {
      // function for sending message with the code through phone number
      console.log("Sending code through phone....");
      await sendAccountConfirmationSms(verfCode, phone);
    }

    res.status(200).json({ message: `Account created sucessfully,Check your ${(account.authorizationMethod==="phone")?"Sms":"email"} for confirmation code to verify account`});
  } else {
    console.log("Not all data is present");
    res.status(400);
    throw new Error("Bad request, some fields in the body was not set");
  }
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {});

export const accountConfirmationController = asyncHandler(async (req: Request, res: Response) => {});

export const resetAccountController = asyncHandler(async (req: Request, res: Response) => {});

export const sendConfirmationCodeController = asyncHandler(async (req: Request, res: Response) => {});
