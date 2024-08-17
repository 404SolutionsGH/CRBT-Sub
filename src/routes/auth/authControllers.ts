import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AccountSchema } from "../../schema/accountSchema";
import { encryptPassword, verifyPassword } from "../../libs/bcrypt";
import { sendAccountResetEmail } from "../../libs/nodeMailer";
import { verfCodeGenerator } from "../../components/verfCodeGenerator";
import { sendConfirmationMessage } from "../../components/sendConfirmationMessage";
import { jwtForLogIn } from "../../libs/jwt";
import { verifyTokenIdFromFirebase } from "../../libs/firebase";

// helper methods

const createAccount = async (
  phone: string,
  accountType: string,
  firstName: string | undefined,
  lastName: string | undefined,
  res: Response,
  langPref: string | undefined
) => {
  console.log("Saving data in data in database...");
  let account: any;
  if (firstName && lastName) {
    account = await AccountSchema.create({ phone, accountType, firstName, lastName, langPref: langPref ? langPref : "eng" });
    // console.log("Sending verification code....");
    // await sendConfirmationMessage(account.authorizationMethod, verfCode, email, phone, firstName);
  } else {
    account = await AccountSchema.create({ phone, accountType,langPref: langPref ? langPref : "eng", isVerified: true });
  }
  res.status(200).json({
    message: `Account created sucessfully,Check your`,
    token: account.accountType === "norm" ? jwtForLogIn(String(account._id)) : null,
  });
};

export const signUpController = asyncHandler(async (req: Request, res: Response) => {
  console.log("Account creation began ...");
  const { password, accountType, phone, firstName, lastName, langPref } = req.body;
  console.log("Checking if remaining neccessary data are present...");
  if (password && (accountType === "admin" || accountType === "superAdmin")) {
    console.log("All data present");
    console.log("Account belongs to admin or superAdmin....");
    // console.log("Encypting password...");

    // const encryptedPassword = await encryptPassword(password);

    // console.log("Encyption done");

    await createAccount(phone, accountType, firstName, lastName, res, langPref);
    // console.log("Generating 4 digit verification code");
    // const verfCode = verfCodeGenerator();

    // console.log("Saving data in data in database...");
    // const account = await AccountSchema.create({ email, password: encryptedPassword, phone, accountType, verfCode, firstName });
    // console.log("Sending verification code....");
    // await sendConfirmationMessage(account.authorizationMethod, verfCode, email, phone, firstName);
    // res.status(200).json({ message: `Account created sucessfully,Check your ${account.authorizationMethod === "phone" ? "Sms" : "email"} for confirmation code to verify account` });
  } else if (accountType === "norm") {
    console.log("Account normal user...");
    await createAccount(phone, accountType, firstName, lastName, res, langPref);
  } else {
    console.log("Not all data is present");
    res.status(400);
    throw new Error("Bad request, some fields in the body was not set");
  }
});

export const loginControllerForAdmins = asyncHandler(async (req: Request, res: Response) => {
  console.log("An Admin logging in ...");
  const { password, account } = req.body;
  // checking if account has been verfied

  if (!account.isVerified) {
    res.status(401);
    throw new Error("Account is not verified,please verify account to login");
  }

  if (password) {
    console.log("Verifying password..");
    if (await verifyPassword(password, account.password)) {
      console.log("Password Verified");
      console.log("Respond Sent with Token, Login Sucessfull");
      res.json({ message: "Login Sucessfull", token: jwtForLogIn(String(account._id)) });
    } else {
      console.log("Password Incorrect");
      res.status(400);
      throw new Error("Invalid Login Credentails");
    }
  } else {
    res.status(400);
    throw new Error("No data passed for password in request body");
  }
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
  console.log("User logging in ...");
  const { idToken, account } = req.body;
  // checking if account has been verfied

  if (!idToken) {
    res.status(400);
    throw new Error("No idToken passed in request body");
  }
  console.log("Verifying idToken form firebase..");

  if (await verifyTokenIdFromFirebase(idToken)) {
    console.log("Id token Verified");
    console.log("Respond Sent with Token, Login Sucessfull");
    res.json({ message: "Login Sucessfull", token: jwtForLogIn(String(account._id)) });
  }
});



// export const sendConfirmationCodeController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("User requesting new confirmation message..");
//   const { email, phone } = req.body;
//   const verfCode = verfCodeGenerator();
//   let authorizationMethod = "";
//   console.log("New verfication code created");

//   if (email) {
//     console.log("Updating verfcode in user's account...");
//     const account = await AccountSchema.findOneAndUpdate({ email }, { $set: { verfCode } });
//     console.log("Account updated");
//     if (account) {
//       await sendConfirmationMessage(account.authorizationMethod, verfCode, email, account.phone, account.firstName);
//       authorizationMethod = account.authorizationMethod;
//     }
//   } else if (phone) {
//     console.log("Updating verfcode in user's account");
//     const account = await AccountSchema.findOneAndUpdate({ email }, { $set: { verfCode } });
//     console.log("Account updated");
//     if (account) {
//       await sendConfirmationMessage(account.authorizationMethod, verfCode, account.email, account.phone, account.firstName);
//       authorizationMethod = account.authorizationMethod;
//     }
//   }
//   res.json({ message: `Confirmation code sent successfully,Check ${authorizationMethod === "phone" ? "Sms" : authorizationMethod}  for confirmation code to verify account` });
// });



// export const resetAccountController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("A user is reseting account....");
//   const { account } = req.body;
//   const newPassword = `${account.firstName}${verfCodeGenerator()}4563`;
//   await AccountSchema.findOneAndUpdate({ email: account.email }, { $set: { password: await encryptPassword(newPassword) } });
//   console.log("Account reset complete");
//   console.log("Sending Account reset email...");
//   await sendAccountResetEmail(account.firstName, newPassword, account.email);
//   res.json({ message: "Account reset successfull, Check email for new password" });
// });



// export const accountConfirmationController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("An account is been verified....");
//   const { email, verfCode } = req.body;

//   if (verfCode) {
//     // comparing verfCode in request to the one in the account
//     console.log("Comparing verfCode...");
//     const account = await AccountSchema.findOneAndUpdate({ email, verfCode: Number(verfCode) }, { $set: { verfCode: 0, isVerified: true } });
//     if (account) {
//       console.log("Account verfication successfull");
//       res.json({ message: "Account successfully verified" });
//     } else {
//       console.log("Account verification failed");
//       res.status(401);
//       throw new Error("Account verfication failed,please check verification code again and try again");
//     }
//   } else {
//     res.status(400);
//     throw new Error("No data pass for field verfCode in the request body");
//   }
// });