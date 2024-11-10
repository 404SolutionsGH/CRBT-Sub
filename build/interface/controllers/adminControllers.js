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
exports.getPointsInfoController = exports.deleteMerchnatsController = exports.deleteUsersController = exports.delePackageCategoriesController = exports.updatePackageCategoriesController = exports.createPackageCategoriesController = exports.deletePackagesController = exports.updatePackagesController = exports.createPackagesController = exports.getMerchantsController = exports.getUsersController = exports.changePasswordController = exports.updateAdminAccountInfoController = exports.getAdminAccountInfoController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/entities/AppError");
const getUsers_1 = require("../../useCases/admin/getUsers");
const getMerchants_1 = require("../../useCases/admin/getMerchants");
const addPackage_1 = require("../../useCases/admin/addPackage");
const Package_1 = require("../../domain/entities/Package");
const updatePackage_1 = require("../../useCases/admin/updatePackage");
const isStringNumber_1 = require("../../@common/helperMethods/isStringNumber");
const deletePackage_1 = require("../../useCases/admin/deletePackage");
const addPackageCat_1 = require("../../useCases/admin/addPackageCat");
const PackageCategory_1 = require("../../domain/entities/PackageCategory");
const updatePackageCat_1 = require("../../useCases/admin/updatePackageCat");
const deletePackageCat_1 = require("../../useCases/admin/deletePackageCat");
const getAccountInfo_1 = require("../../useCases/admin/getAccountInfo");
const updateAccountInfo_1 = require("../../useCases/admin/updateAccountInfo");
const Admin_1 = require("../../domain/entities/Admin");
const changePassword_1 = require("../../useCases/admin/changePassword");
const deleteAccounts_1 = require("../../useCases/admin/deleteAccounts");
const getRewardInfo_1 = require("../../useCases/admin/getRewardInfo");
exports.getAdminAccountInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    res.status(200).json(yield (0, getAccountInfo_1.getAdminAccountInfo)(id));
}));
exports.updateAdminAccountInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, firstName, lastName, email } = req.body;
    res.status(200).json({ message: "Account Info Updated", updatedData: yield (0, updateAccountInfo_1.updateAdminAccountInfo)(Admin_1.Admin.build({ id, firstName, lastName, email })) });
}));
exports.changePasswordController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newPassword, oldPassword, id } = req.body;
    if (!newPassword || !oldPassword)
        throw new AppError_1.AppError(!newPassword ? "No data passed for newPassword in body" : "No data passed for oldPassword in body", 400);
    yield (0, changePassword_1.changePassword)(newPassword, oldPassword, id);
    res.status(200).json({ messge: "Password changed sucessfully" });
}));
exports.getUsersController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = req.params;
    const { id } = req.body;
    let users;
    if (type === "all") {
        users = yield (0, getUsers_1.getAllUsers)();
    }
    else if (type === "sub" || type === "unSub") {
        users = yield (0, getUsers_1.getSubUsers)(id, type);
    }
    else
        throw new AppError_1.AppError("Invalid value passed for type url parameter value should be either all or sub", 400);
    res.status(200).json(users);
}));
exports.getMerchantsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cat } = req.params;
    let merchants;
    if (cat === "all") {
        merchants = yield (0, getMerchants_1.getAllMerch)();
    }
    else if (cat === "sub" || cat === "unSub") {
        merchants = yield (0, getMerchants_1.getSubMerch)(cat);
    }
    else
        throw new AppError_1.AppError("Invalid value passed for cat url parameter value should be either all or sub", 400);
    res.status(200).json(merchants);
}));
exports.createPackagesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId, price } = req.body;
    if (!packageName || !packageType || !packageValidity || !packageCatId)
        throw new AppError_1.AppError(!packageName
            ? "No value passed for packageName in body"
            : !packageType
                ? "No value passed for packageType in body"
                : !packageCatId
                    ? "No value passed for packageCatId in body"
                    : "No value passed for packageValidity", 400);
    yield (0, addPackage_1.addPackage)(Package_1.Package.build({ packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId, price }));
    res.status(201).json({ message: `The package ${packageName} has been created sucessfully` });
}));
exports.updatePackagesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId, price } = req.body;
    (0, isStringNumber_1.isStringContentNumber)(req.params.id, "id");
    const id = Number(req.params.id);
    yield (0, updatePackage_1.updatePackage)(Package_1.Package.build({ id, packageName, packageDescription, packageImg, packageType, ussdCode, packageValidity, packageCatId, price }));
    res.status(200).json({ message: `The package ${packageName} has been updated sucessfully` });
}));
exports.deletePackagesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(id, "id");
    yield (0, deletePackage_1.deletePackage)(Number(id));
    res.status(200).json({ messge: "Package Deletion sucessfull" });
}));
exports.createPackageCategoriesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    yield (0, addPackageCat_1.addPackageCat)(PackageCategory_1.PackageCategory.build({ title, description }));
    res.status(201).json({ message: `The package category ${title} has been created sucessfully` });
}));
exports.updatePackageCategoriesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    (0, isStringNumber_1.isStringContentNumber)(req.params.id, "id");
    const id = Number(req.params.id);
    yield (0, updatePackageCat_1.updatePackageCategory)(PackageCategory_1.PackageCategory.build({ title, description, id }));
    res.status(200).json({ message: `The package category ${title} has been updated sucessfully` });
}));
exports.delePackageCategoriesController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(id, "id");
    yield (0, deletePackageCat_1.deletePackageCategory)(Number(id));
    res.status(200).json({ messge: "Package Category and it related package items has been deleted sucessfull" });
}));
exports.deleteUsersController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(id, "id");
    yield (0, deleteAccounts_1.deleteUserAccount)(Number(id));
    res.status(204).end();
}));
exports.deleteMerchnatsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(id, "id");
    yield (0, deleteAccounts_1.deleteMerchantAccount)(Number(id));
    res.status(204).end();
}));
exports.getPointsInfoController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountType } = req.params;
    if (!["user", "admin"].includes(accountType))
        throw new AppError_1.AppError("Value for accountType Should either be user or admin", 400);
    res.status(200).json(yield getRewardInfo_1.getRewardInfoOfAccounts);
}));
