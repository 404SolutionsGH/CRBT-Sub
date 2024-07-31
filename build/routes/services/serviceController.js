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
exports.unsubscribeServiceController = exports.subscribeServiceController = exports.newServiceController = void 0;
const accountSchema_1 = require("../../schema/accountSchema");
const mongoose_1 = require("../../libs/mongoose");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const crbtServiceSchema_1 = require("../../schema/crbtServiceSchema");
const songSchema_1 = require("../../schema/songSchema");
const albumSchema_1 = require("../../schema/albumSchema");
const allowedPlannedType = ["basic", "silver", "gold"];
exports.newServiceController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating a new Service...");
    const { email, planType, category, serviceName, account } = req.body;
    if (email && planType && category && allowedPlannedType.includes(planType) && account.accountType === "admin" && serviceName) {
        console.log("Checking if account already has a service");
        if (account.service) {
            console.log("Account already has a service");
            throw new Error("Account already has a service");
        }
        const newService = yield crbtServiceSchema_1.CrbtServiceSchema.create({ ownerId: account._id, planType, serviceName });
        console.log("Service Created");
        console.log("Updating service owner account with with service id..");
        yield accountSchema_1.AccountSchema.updateOne({ _id: account._id }, { $set: { service: newService._id } });
        console.log("Update done");
        res.status(200).json({ message: "Service has been created" });
    }
    else {
        res.status(400);
        throw new Error(allowedPlannedType.includes(planType) ? "Invalid data passed for planType in request body" : account.accountType !== "norm" ? "Cannot create service for non admin users" : "Invalid request body");
    }
}));
exports.subscribeServiceController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("A user is subscriping to a service...");
    const { id, songId, billingTime, date, nextSubPayment } = req.body;
    if (songId && billingTime && nextSubPayment) {
        console.log("Checking if user is already on a subscrption");
        const accountInfo = yield accountSchema_1.AccountSchema.findById(id);
        if (accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.subscribedService) {
            res.status(409);
            throw new Error("User is already on a subscription");
        }
        console.log("User not on any subscription");
        console.log("Updating songInfo...");
        const songInfo = yield songSchema_1.SongSchema.findOneAndUpdate({ _id: (0, mongoose_1.tObjectId)(songId) }, { $inc: { numberOfSubscribers: 1 } });
        if (!songInfo) {
            throw new Error("No song with this id exist");
        }
        console.log("Update done");
        console.log("Updating serviceInfo...");
        yield crbtServiceSchema_1.CrbtServiceSchema.updateOne({ _id: songInfo === null || songInfo === void 0 ? void 0 : songInfo.subServiceId }, { $inc: { numberOfSubscribers: 1 } });
        console.log("Update done");
        if (songInfo.albumName !== "N/A") {
            console.log("Updating albumInfo...");
            yield albumSchema_1.AlbumSchema.updateOne({ name: songInfo.albumName }, { $inc: { numSubscribers: 1 } });
            console.log("Update done");
        }
        console.log("Updating user's account..");
        yield accountSchema_1.AccountSchema.updateOne({ _id: (0, mongoose_1.tObjectId)(id) }, { subscribedService: { songId, date: new Date().toISOString(), billingTime, nextSubPayment } });
        console.log("Update done");
        res.status(201).json({ message: "Subscription data saved, run ussd code" });
    }
    else {
        res.status(400);
        throw new Error("Invalid request body");
    }
}));
exports.unsubscribeServiceController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("A user is unsubscribing from a service...");
    const { id, songId } = req.body;
    if (songId) {
        // 1. Changed condition to check only for songId
        console.log("Checking if user is already on a subscription");
        const accountInfo = yield accountSchema_1.AccountSchema.findById(id);
        if (!(accountInfo === null || accountInfo === void 0 ? void 0 : accountInfo.subscribedService)) {
            // 2. Changed condition and error message
            res.status(409);
            throw new Error("No service to unsubscribe from");
        }
        // 4. Create a variable to store accountInfo.subscribedService
        const subscribedServiceData = accountInfo.subscribedService;
        console.log("Updating songInfo...");
        const songInfo = yield songSchema_1.SongSchema.findOneAndUpdate({ _id: (0, mongoose_1.tObjectId)(songId) }, { $inc: { numberOfSubscribers: -1 } } // 6. Changed to decrease by one
        );
        if (!songInfo) {
            throw new Error("No song with this id exists");
        }
        console.log("Update done");
        console.log("Updating serviceInfo...");
        yield crbtServiceSchema_1.CrbtServiceSchema.updateOne({ _id: songInfo === null || songInfo === void 0 ? void 0 : songInfo.subServiceId }, { $inc: { numberOfSubscribers: -1 } } // 6. Changed to decrease by one
        );
        console.log("Update done");
        if (songInfo.albumName !== "N/A") {
            console.log("Updating albumInfo...");
            yield albumSchema_1.AlbumSchema.updateOne({ name: songInfo.albumName }, { $inc: { numSubscribers: -1 } } // 6. Changed to decrease by one
            );
            console.log("Update done");
        }
        console.log("Updating user's account...");
        yield accountSchema_1.AccountSchema.updateOne({ _id: (0, mongoose_1.tObjectId)(id) }, {
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
        });
        console.log("Update done");
        // 7. Change the message in the response
        res.status(201).json({ message: "User has been unsubscribed and data updated" });
    }
    else {
        res.status(400);
        throw new Error("Invalid request body");
    }
}));
