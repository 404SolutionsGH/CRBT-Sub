"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeServiceController = exports.newServiceController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/entities/AppError");
const createService_1 = require("../../useCases/service/createService");
const Service_1 = require("../../domain/entities/Service");
exports.newServiceController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating a new Service...");
    const { email, planType, category, serviceName } = req.body;
    if (!email)
        throw new AppError_1.AppError("No data passed for email", 400);
    yield (0, createService_1.createService)(email, Service_1.Service.build({ planType, serviceName, category }));
    res.status(201).json({ messge: "Service created sucessfully" });
}));
exports.subscribeServiceController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("A user is subscriping to a service...");
    const { id, songId, billingTime, date, nextSubPayment } = req.body;
    //   if (songId && billingTime && nextSubPayment) {
    //     console.log("Checking if user is already on a subscrption");
    //     const accountInfo = await AccountSchema.findById(id);
    //     if (accountInfo?.subscribedService) {
    //       res.status(409);
    //       throw new Error("User is already on a subscription");
    //     }
    //     console.log("User not on any subscription");
    //     console.log("Updating songInfo...");
    //     const songInfo = await SongSchema.findOneAndUpdate({ _id: tObjectId(songId) }, { $inc: { numberOfSubscribers: 1 } });
    //     if (!songInfo) {
    //       throw new Error("No song with this id exist");
    //     }
    //     console.log("Update done");
    //     console.log("Updating serviceInfo...");
    //     await CrbtServiceSchema.updateOne({ ownerId: songInfo.ownerId }, { $inc: { numberOfSubscribers: 1 } });
    //     console.log("Update done");
    //     if (songInfo.albumName !== "N/A") {
    //       console.log("Updating albumInfo...");
    //       await AlbumSchema.updateOne({ name: songInfo.albumName }, { $inc: { numSubscribers: 1 } });
    //       console.log("Update done");
    //     }
    //     console.log("Updating user's account..");
    //     await AccountSchema.updateOne({ _id: tObjectId(id) }, { subscribedService: { songId, date: new Date().toISOString(), billingTime, nextSubPayment } });
    //     console.log("Update done");
    //     res.status(201).json({ message: "Subscription data saved, run ussd code" });
    //   } else {
    //     res.status(400);
    //     throw new Error("Invalid request body");
    //   }
}));
// export const unsubscribeServiceController = asyncHandler(async (req: Request, res: Response) => {
//   console.log("A user is unsubscribing from a service...");
//   const { id, songId } = req.body;
//   if (songId) {
//     // 1. Changed condition to check only for songId
//     console.log("Checking if user is already on a subscription");
//     const accountInfo = await AccountSchema.findById(id);
//     if (!accountInfo?.subscribedService) {
//       // 2. Changed condition and error message
//       res.status(409);
//       throw new Error("No service to unsubscribe from");
//     }
//     // 4. Create a variable to store accountInfo.subscribedService
//     const subscribedServiceData = accountInfo.subscribedService;
//     console.log("Updating songInfo...");
//     const songInfo = await SongSchema.findOneAndUpdate(
//       { _id: tObjectId(songId) },
//       { $inc: { numberOfSubscribers: -1 } } // 6. Changed to decrease by one
//     );
//     if (!songInfo) {
//       throw new Error("No song with this id exists");
//     }
//     console.log("Update done");
//     console.log("Updating serviceInfo...");
//     await CrbtServiceSchema.updateOne(
//       { ownerId: songInfo?.ownerId },
//       { $inc: { numberOfSubscribers: -1 } } // 6. Changed to decrease by one
//     );
//     console.log("Update done");
//     if (songInfo.albumName !== "N/A") {
//       console.log("Updating albumInfo...");
//       await AlbumSchema.updateOne(
//         { name: songInfo.albumName },
//         { $inc: { numSubscribers: -1 } } // 6. Changed to decrease by one
//       );
//       console.log("Update done");
//     }
//     console.log("Updating user's account...");
//     await AccountSchema.updateOne(
//       { _id: tObjectId(id) },
//       {
//         subscribedService: null, // 5. Set subscribedService to null
//         $push: {
//           // 5. Update unsubscribeService array with the new object
//           unsubscribeService: {
//             songId: subscribedServiceData.songId,
//             date: subscribedServiceData.date,
//             billingTime: subscribedServiceData.billingTime,
//             endDate: new Date().toISOString(),
//           },
//         },
//       }
//     );
//     console.log("Update done");
//     // 7. Change the message in the response
//     res.status(201).json({ message: "User has been unsubscribed and data updated" });
//   } else {
//     res.status(400);
//     throw new Error("Invalid request body");
//   }
// });
