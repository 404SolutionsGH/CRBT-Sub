"use strict";
// import mongoose, { Schema } from "mongoose";
// import { Account } from "../components/customDataTypes";
// // the userSchema
// const accountSchema = new mongoose.Schema<Account>({
//   firstName: {
//     type: String,
//     default: "N/A",
//   },
//   lastName: {
//     type: String,
//     default: "N/A",
//   },
//   password:String,
//   phone: {
//     type: String,
//     required: true,
//   },
//   accountType: {
//     type: String,
//     enum: ["norm", "admin", "superAdmin"],
//   },
//   authorizationMethod: {
//     type: String,
//     enum: ["phone", "email"],
//     default: "phone",
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   langPref: {
//     type: String,
//     required: true,
//   },
//   accountBalance: String, // for only normal users
//   subscribedService:{
//     type: Object,
//     default:null
//   }, // for only normal users
//   unsubscribeService: Array, // for only normal users
//   transactionHistory: Array, // for only normal users
//   paymentInfo: Array, // this for only admin accounts
//   service: {
//     type: Schema.Types.ObjectId, // id of the crbt service owned by the account if is of the type admin or superAdmin
//     ref: "CrbtService",
//   },
// });
// export const AccountSchema = mongoose.model("Account", accountSchema);
