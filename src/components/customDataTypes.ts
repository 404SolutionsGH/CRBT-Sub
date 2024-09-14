// This file holds all the custome data Schema.types been used
import mongooseString, { Schema } from "mongoose";
import multer from "multer";

// SubService(Sub=subscribe)
export interface SubService {
  songId?: Schema.Types.ObjectId;
  date?: string;
  billingTime: string;   // monthly, yearly ,weekily
  nextSubPayment?: string;
}

// unsubService(unsub=unsubscribe)
export interface UnsubService {
  subServiceId: Schema.Types.ObjectId;
  songId?: Schema.Types.ObjectId;
  date?: string;
  billingTime: string;
  endDate: string;
}

export interface CrbtService {
  _id?: Schema.Types.ObjectId;
  ownerId: Schema.Types.ObjectId;
  serviceName: string;
  servicePrice: string; // price being paid to run this service
  planType: string;
  songs: Array<Schema.Types.ObjectId>; // array of the songs id
  albums: Array<string>; // array of strings of album names
  lang: string;
  category: string;
  date: string;
  numberOfSubscribers: number;
}

export interface Account {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  accountType: string;
  authorizationMethod: string;
  isVerified: boolean;
  verfCode: number;
  langPref: string;
  accountBalance: String; // for only normal users
  subscribedService: SubService|null; // for only normal users
  unsubscribeService: Array<UnsubService>; // for only normal users
  transactionHistory: Array<string>; // for only normal users
  paymentInfo: Array<string>; // this for only admin accounts(is an array of strings for now but will change)
  service: CrbtService | Schema.Types.ObjectId;
}

export interface Song {
  _id: Schema.Types.ObjectId;
  ownerId: Schema.Types.ObjectId;
  albumName: string;
  songTitle: string;
  artisteName: string;
  profile: string;
  song: string;
  lang: string;
  date: string; // The default value will be set in the Mongoose schema, so this can remain a string.
  numberOfListeners: number;
  numberOfSubscribers: number;
  ussdCode: string;
  subscriptionType: "weekly" | "monthly" | "daily";
  price: string;
  category: String;
}
