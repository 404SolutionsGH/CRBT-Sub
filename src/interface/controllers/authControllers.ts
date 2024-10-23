import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppError } from "../../domain/entities/AppError";
import { createUserAccount } from "../../useCases/auth/createUser";
import { User } from "../../domain/entities/User";
import { createAdminAccount } from "../../useCases/auth/createAdmin";
import { Admin } from "../../domain/entities/Admin";
import { userLogin } from "../../useCases/auth/userLogin";
import { adminLogin } from "../../useCases/auth/adminLogin";
import { isStringContentNumber } from "../../@common/helperMethods/isStringNumber";

// import { verifyTokenIdFromFirebase } from "../../libs/firebase";

// // helper methods
const nullAndStringTypeChecker = (data1: any, data2: any, d1Name: string, d2Name: string) => {
  if (!data1 || !data2) throw new AppError(!data1 ? `No data passed for ${d1Name}` : `No data was passed for ${d2Name}`, 400);
  else if (typeof data1 !== "string" || typeof data2 != "string") throw new AppError(typeof data1 !== "string" ? `Value for ${d1Name} must be a string` : `Value for ${d2Name} must be a string`, 400);
};

export const signUpController = asyncHandler(async (req: Request, res: Response) => {
  console.log("Account creation began ...");
  const {email, accountType, password, firstName, lastName, planId } = req.body;

  if (!accountType || RegExp(/^\d+$/).test(accountType) || !planId) {
    throw new AppError(`${!accountType ? "No data passed for accountType in request body" : !planId ? "No data passed for planId" : "Value passed for account type must be a string"}`, 400);
  }

  // if (accountType === "user") {
  //   if (!phone) throw new AppError("No data passed for phone in request body", 400);
  //   res.status(201).json({ message: "User account created sucessfully", token: await createUserAccount(User.build({ phone, langPref })) });
  // }
  if (accountType === "admin") {
    if (!email) throw new AppError("No data passed for email", 400);
    isStringContentNumber(planId, "planId");
    await createAdminAccount(Admin.build({ email, password, adminType: "merchant", firstName, lastName }), planId);
    res.status(201).json({ message: "Admin account created successfully" });
  } else throw new AppError("Value passed for accountType in request body must be admin or user", 400);
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  console.log("User logging in ...");
  const { langPref, phone, email, password, accountType } = req.body;
  let data: any;
  if (accountType === "user") {
    nullAndStringTypeChecker(langPref, phone, "langPref", "phone");
    //use case for user login
    data = await userLogin(User.build({ phone, langPref }));
  } else if (accountType == "admin") {
    nullAndStringTypeChecker(email, password, "email", "password");
    // use case for admin log in
    data = await adminLogin(email, password);
  } else {
    throw new AppError(!accountType ? "No data passed for accontType in body" : `Value for accountType must be either admin or user not ${accountType}`, 400);
  }
  console.log("Login sucessfull");
  res.status(200).json({ message: "Login successfull", account: data.account,token:data.token });
});
