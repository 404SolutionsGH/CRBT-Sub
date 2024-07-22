import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { encryptPassword, verifyPassword } from "../../libs/bcrypt";
import { AccountSchema } from "../../schema/accountSchema";
import { tObjectId } from "../../libs/mongoose";

const updateAccount = async (
  res: Response,
  id: string,
  firstName: string | undefined,
  lastName: string | undefined,
  email: string | undefined,
  oldPassword: string | undefined,
  password: string | undefined,
  passwordInDatabase: string | undefined
) => {
  let newData: any = {};

  if (firstName && lastName && password) {
    // this executes when when newly created account are setting up their profile.
    await AccountSchema.findOneAndUpdate({ _id: tObjectId(id) }, { $set: { firstName, lastName, password: await encryptPassword(password) } });
  } else if (firstName) {
    await AccountSchema.findOneAndUpdate({ _id: tObjectId(id) }, { $set: { firstName } });
  } else if (lastName) {
    await AccountSchema.findOneAndUpdate({ _id: tObjectId(id) }, { $set: { lastName } });
  } else if (email) {
    await AccountSchema.findOneAndUpdate({ _id: tObjectId(id) }, { $set: { email } });
  } else if (oldPassword && password && passwordInDatabase) {
    // check if oldpassword matches the one in the database
    if (await verifyPassword(oldPassword, passwordInDatabase)) {
      await AccountSchema.findOneAndUpdate({ _id: tObjectId(id) }, { $set: { password: await encryptPassword(password) } });
    } else {
      res.status(401);
      throw new Error("Update failed , Passwords don't match");
    }
  } else {
    res.status(400);
    throw new Error("Bad Request,check request body");
  }
};

export const accountUpdateController = asyncHandler(async (req: Request, res: Response) => {
  console.log("User updating account info....");
  const { firstName, lastName, email, password, oldPassword, id } = req.body;
  let infoFromDatabase: any = "";
  //   console.log(`Id=${id}`)
  if (oldPassword) {
    console.log("Info been updated is password...");
    console.log("Getting old password from database...");
    infoFromDatabase = await AccountSchema.find({ _id: tObjectId(id) }).select("password");
    console.log("Old passowrd received");
  }
  await updateAccount(res, id, firstName, lastName, email, oldPassword, password, infoFromDatabase !== "" ? infoFromDatabase[0].password : undefined);
  console.log("Account Updated")
  res.status(200).json({ message: "Update Successful" });
});

export const accountInfoController=asyncHandler(async (req: Request, res: Response) =>{
    const {account}=req.body
    res.status(200).json({message:"Info received successfully",accountInfo:account})
})
