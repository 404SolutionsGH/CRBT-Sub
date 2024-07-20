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
exports.accountUpdateControler = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = require("../../libs/bcrypt");
const accountSchema_1 = require("../../schema/accountSchema");
const mongoose_1 = require("../../libs/mongoose");
const updateAccount = (res, id, firstName, lastName, email, oldPassword, password, passwordInDatabase) => __awaiter(void 0, void 0, void 0, function* () {
    let newData = {};
    if (firstName && lastName && password) {
        // this executes when when newly created account are setting up their profile.
        yield accountSchema_1.AccountSchema.findOneAndUpdate({ _id: (0, mongoose_1.tObjectId)(id) }, { $set: { firstName, lastName, password: yield (0, bcrypt_1.encryptPassword)(password) } });
    }
    else if (firstName) {
        yield accountSchema_1.AccountSchema.findOneAndUpdate({ _id: (0, mongoose_1.tObjectId)(id) }, { $set: { firstName } });
    }
    else if (lastName) {
        yield accountSchema_1.AccountSchema.findOneAndUpdate({ _id: (0, mongoose_1.tObjectId)(id) }, { $set: { lastName } });
    }
    else if (email) {
        yield accountSchema_1.AccountSchema.findOneAndUpdate({ _id: (0, mongoose_1.tObjectId)(id) }, { $set: { email } });
    }
    else if (oldPassword && password && passwordInDatabase) {
        // check if oldpassword matches the one in the database
        if (yield (0, bcrypt_1.verifyPassword)(oldPassword, passwordInDatabase)) {
            yield accountSchema_1.AccountSchema.findOneAndUpdate({ _id: (0, mongoose_1.tObjectId)(id) }, { $set: { password: yield (0, bcrypt_1.encryptPassword)(password) } });
        }
        else {
            res.status(401);
            throw new Error("Update failed , Passwords don't match");
        }
    }
    else {
        res.status(400);
        throw new Error("Bad Request,check request body");
    }
});
exports.accountUpdateControler = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("User updating account info....");
    const { firstName, lastName, email, password, oldPassword, id } = req.body;
    let infoFromDatabase = "";
    //   console.log(`Id=${id}`)
    if (oldPassword) {
        console.log("Info been updated is password...");
        console.log("Getting old password from database...");
        infoFromDatabase = yield accountSchema_1.AccountSchema.find({ _id: (0, mongoose_1.tObjectId)(id) }).select("password");
        console.log("Old passowrd received");
    }
    yield updateAccount(res, id, firstName, lastName, email, oldPassword, password, infoFromDatabase !== "" ? infoFromDatabase[0].password : undefined);
    console.log("Account Updated");
    res.status(200).json({ message: "Update Successful" });
}));
