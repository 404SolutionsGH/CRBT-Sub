import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AccountSchema } from "../schema/accountSchema";



export const getAccount = asyncHandler(async (req:Request,res:Response,next:NextFunction) => {
console.log("Getting an account info...")
const {id} =req.body
// getting the account data using the id
const accountInfo = await AccountSchema.findById(id).select("-_id -__v -password -verfCode -isVerified -accountType");
console.log("Account Info received");
req.body.account=accountInfo
next()
});