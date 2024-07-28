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
exports.newServiceController = void 0;
const accountSchema_1 = require("../../schema/accountSchema");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const crbtServiceSchema_1 = require("../../schema/crbtServiceSchema");
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
