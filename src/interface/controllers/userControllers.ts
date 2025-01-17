import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { encryptPassword, verifyPassword } from "../../libs/bcrypt";
import { updateAccountInfo } from "../../useCases/user/updateAccountInfo";
import { User } from "../../domain/entities/User";
import { AppError } from "../../domain/entities/AppError";
import { getAccountInfo } from "../../useCases/user/getAccountInfo";
import { UserContacts } from "../../domain/entities/UserContacts";
import { saveUsersContacts } from "../../useCases/user/saveUsersContacts";
import { getUserContacts } from "../../useCases/user/getUsersContacts";

export const accountUpdateController = asyncHandler(async (req: Request, res: Response) => {
  console.log("User updating account info....");
  const { firstName, lastName, id, langPref, phone, accountBalance, profile, location,email } = req.body;

  if ((typeof firstName !== "string" && firstName) || (typeof lastName !== "string" && lastName))
    throw new AppError(typeof firstName !== "string" ? "Value for firstName should be a string" : "Value for lastName should be a string", 400);

  const updatedData = await updateAccountInfo(User.build({ firstName, lastName, id: Number(id), langPref, phone, accountBalance, profile, location ,email}));

  if (!updatedData) {
    throw new AppError("Update failed, account does not exist", 404);
  }
  res.status(200).json({ message: "Account updated", updatedAccount: updatedData });
});

export const accountInfoController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;

  const { firstName, lastName, accountBalance, phone, langPref, subSongDetails, rewardPoints, createdAt,email } = await getAccountInfo(Number(id));
  res.status(200).json({ firstName, lastName, email,accountBalance, phone, langPref, rewardPoints, createdAt, subSongDetails });
});

export const saveUserContactsController = asyncHandler(async (req: Request, res: Response) => {
  const { contacts, id } = req.body;
  if (!Array.isArray(contacts)) {
    throw new AppError("contacts must be a string array", 400);
  }
  await saveUsersContacts(contacts, +id);
  res.status(201).json({ message: "Contacts Saved" });
});

export const getUserContactsController = asyncHandler(async (req: Request, res: Response) => {
  const results = await getUserContacts();
  res.status(200).json(results);
});
