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
exports.getAdminPlanController = exports.updateAdminPlanController = exports.deleteAdminPlanController = exports.planSubcriptionController = exports.getAllPlansController = exports.createPlanController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/entities/AppError");
const createAdminPlan_1 = require("../../useCases/plans/createAdminPlan");
const AdminPlan_1 = require("../../domain/entities/AdminPlan");
const getAllPlans_1 = require("../../useCases/plans/getAllPlans");
const subcribePlan_1 = require("../../useCases/plans/subcribePlan");
const isStringNumber_1 = require("../../@common/helperMethods/isStringNumber");
const deletePlan_1 = require("../../useCases/plans/deletePlan");
const updatePlan_1 = require("../../useCases/plans/updatePlan");
const getAPlan_1 = require("../../useCases/plans/getAPlan");
const validateBenefitsObj = (beneFitsObj) => {
    const { songLimit, subscriberLimit, numberOfSongsPerUpload } = beneFitsObj;
    if (!songLimit && typeof songLimit !== "number")
        throw new AppError_1.AppError(!songLimit ? "benefits object lacks the field songLimit" : "songLimit must be a number", 400);
    else if (!subscriberLimit && typeof subscriberLimit !== "number")
        throw new AppError_1.AppError(!subscriberLimit ? "benefits object lacks the field subscriberLimit" : "subscribersLimit must be a number", 400);
    else if (!numberOfSongsPerUpload && typeof numberOfSongsPerUpload !== "number")
        throw new AppError_1.AppError(!numberOfSongsPerUpload ? "benefits object lacks the field  numberOfSongsPerUpload" : "numberOfSongsPerUpload must be number", 400);
    //   future validations can come here
};
exports.createPlanController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planType, price, subType, benefits, planPoints } = req.body;
    if (!planType || !subType || !benefits)
        throw new AppError_1.AppError(!planType ? "No data passed for planType" : !benefits ? "No data passed for benefits" : "No data passed for subType", 400);
    validateBenefitsObj(benefits);
    yield (0, createAdminPlan_1.createAdminPlan)(AdminPlan_1.AdminPlan.build({ planType, price, subType, benefits, planPoints }));
    res.status(200).json({ message: "Plan has been created sucessfully" });
}));
exports.getAllPlansController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ allPlans: yield (0, getAllPlans_1.getAllPlans)() });
}));
exports.planSubcriptionController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { planId, phone } = req.params;
    const numRegExp = RegExp("^d+$");
    (0, isStringNumber_1.isStringContentNumber)(planId, "planId");
    if (!phone)
        throw new AppError_1.AppError("No Value passed for phone", 400);
    const checkOutPageLink = yield (0, subcribePlan_1.subscibeToPlan)(id, Number(planId), phone);
    res.status(201).json({ checkoutUrl: checkOutPageLink });
}));
exports.deleteAdminPlanController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planId } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(planId, "planId");
    yield (0, deletePlan_1.deletePlan)(Number(planId));
    res.status(200).json({ message: "Plan deleted sucessfully" });
}));
exports.updateAdminPlanController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planType, price, subType, benefits, planPoints } = req.body;
    const { planId } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(planId, "planId");
    if (!planType || !subType || !benefits)
        throw new AppError_1.AppError(!planType ? "No data passed for planType" : !benefits ? "No data passed for benefits" : "No data passed for subType", 400);
    validateBenefitsObj(benefits);
    res.status(200).json({ message: "Plan updated sucessfully", updatedPlan: yield (0, updatePlan_1.updateAdminPlan)(AdminPlan_1.AdminPlan.build({ planType, price, subType, benefits, planId, planPoints })) });
}));
exports.getAdminPlanController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planId } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(planId, "planId");
    res.status(200).json({ plan: yield (0, getAPlan_1.getAdminPlan)(Number(planId)) });
}));
