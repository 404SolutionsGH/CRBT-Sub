import { NextFunction, Request, Response } from "express";
import { AccountSchema } from "../../schema/accountSchema";
import { tObjectId } from "../../libs/mongoose";
import asyncHandler from "express-async-handler";
import { CrbtServiceSchema } from "../../schema/crbtServiceSchema";
import { SongSchema } from "../../schema/songSchema";
import { AlbumSchema } from "../../schema/albumSchema";

const allowedPlannedType = ["basic", "silver", "gold"];

export const newServiceController = asyncHandler(async (req: Request, res: Response) => {
  console.log("Creating a new Service...");

  const { email, planType, category, serviceName, account } = req.body;

  if (email && planType && category && allowedPlannedType.includes(planType) && account.accountType === "admin" && serviceName) {
    console.log("Checking if account already has a service");
    if (account.service) {
      console.log("Account already has a service");
      throw new Error("Account already has a service");
    }
    const newService = await CrbtServiceSchema.create({ ownerId: account._id, planType, serviceName });
    console.log("Service Created");
    console.log("Updating service owner account with with service id..");
    await AccountSchema.updateOne({ _id: account._id }, { $set: { service: newService._id } });
    console.log("Update done");
    res.status(200).json({ message: "Service has been created" });
  } else {
    res.status(400);
    throw new Error(
      allowedPlannedType.includes(planType) ? "Invalid data passed for planType in request body" : account.accountType !== "norm" ? "Cannot create service for non admin users" : "Invalid request body"
    );
  }
});

export const subscribeServiceController = asyncHandler(async (req: Request, res: Response) => {
  console.log("A user is subscriping to a service...");
  const { id, songId, billingTime, date, nextSubPayment } = req.body;

  if (songId && billingTime && nextSubPayment) {
    console.log("Checking if user is already on a subscrption");

    const accountInfo = await AccountSchema.findById(id);

    if (accountInfo?.subscribedService) {
      res.status(409);
      throw new Error("User is already on a subscription");
    }
    console.log("User not on any subscription");

    console.log("Updating songInfo...");
    const songInfo = await SongSchema.findOneAndUpdate({ _id: tObjectId(songId) }, { $inc: { numberOfSubscribers: 1 } });

    if (!songInfo) {
      throw new Error("No song with this id exist");
    }
    console.log("Update done");
    console.log("Updating serviceInfo...");
    await CrbtServiceSchema.updateOne({ _id: songInfo?.subServiceId }, { $inc: { numberOfSubscribers: 1 } });
    console.log("Update done");

    if (songInfo.albumName !== "N/A") {
      console.log("Updating albumInfo...");
      await AlbumSchema.updateOne({ name: songInfo.albumName }, { $inc: { numSubscribers: 1 } });
      console.log("Update done");
    }

    console.log("Updating user's account..");
    await AccountSchema.updateOne({ _id: tObjectId(id) }, { subscribedService: { songId, date: new Date().toISOString(), billingTime, nextSubPayment } });
    console.log("Update done");

    res.status(201).json({ message: "Subscription data saved, run ussd code" });
  } else {
    res.status(400);
    throw new Error("Invalid request body");
  }
});

export const unsubscribeServiceController = asyncHandler(async (req: Request, res: Response) => {
  console.log("A user is unsubscribing from a service...");
  const { id, songId } = req.body; 

  if (songId) {
    // 1. Changed condition to check only for songId
    console.log("Checking if user is already on a subscription");

    const accountInfo = await AccountSchema.findById(id);

    if (!accountInfo?.subscribedService) {
      // 2. Changed condition and error message
      res.status(409);
      throw new Error("No service to unsubscribe from");
    }

    // 4. Create a variable to store accountInfo.subscribedService
    const subscribedServiceData = accountInfo.subscribedService;

    console.log("Updating songInfo...");
    const songInfo = await SongSchema.findOneAndUpdate(
      { _id: tObjectId(songId) },
      { $inc: { numberOfSubscribers: -1 } } // 6. Changed to decrease by one
    );

    if (!songInfo) {
      throw new Error("No song with this id exists");
    }
    console.log("Update done");
    console.log("Updating serviceInfo...");
    await CrbtServiceSchema.updateOne(
      { _id: songInfo?.subServiceId },
      { $inc: { numberOfSubscribers: -1 } } // 6. Changed to decrease by one
    );
    console.log("Update done");

    if (songInfo.albumName !== "N/A") {
      console.log("Updating albumInfo...");
      await AlbumSchema.updateOne(
        { name: songInfo.albumName },
        { $inc: { numSubscribers: -1 } } // 6. Changed to decrease by one
      );
      console.log("Update done");
    }

    console.log("Updating user's account...");
    await AccountSchema.updateOne(
      { _id: tObjectId(id) },
      {
        subscribedService: null, // 5. Set subscribedService to null
        $push: {
          // 5. Update unsubscribeService array with the new object
          unsubscribeService: {
            songId: subscribedServiceData.songId,
            date: subscribedServiceData.date,
            billingTime: subscribedServiceData.billingTime,
            endDate: new Date().toISOString(),
          },
        },
      }
    );
    console.log("Update done");

    // 7. Change the message in the response
    res.status(201).json({ message: "User has been unsubscribed and data updated" });
  } else {
    res.status(400);
    throw new Error("Invalid request body");
  }
});
