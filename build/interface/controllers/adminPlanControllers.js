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
exports.planSubcriptionController = exports.getAllPlansController = exports.createPlanController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/entities/AppError");
const createAdminPlan_1 = require("../../useCases/plans/createAdminPlan");
const AdminPlan_1 = require("../../domain/entities/AdminPlan");
const getAllPlans_1 = require("../../useCases/plans/getAllPlans");
const subcribePlan_1 = require("../../useCases/plans/subcribePlan");
const validateBenefitsObj = (beneFitsObj) => {
    const { songLimit } = beneFitsObj;
    if (!songLimit)
        throw new AppError_1.AppError("benefits object lacks the field songLimit", 400);
    //   future validations can come here
};
const checkIdValidy = (id) => {
    const alphaReg = /[a-zA-Z]/;
    const decimalReg = /\./;
    if (alphaReg.test(id)) {
        throw new AppError_1.AppError("Item id must be an integer not a character or alphanumeric characters", 400);
    }
    else if (decimalReg.test(id)) {
        throw new AppError_1.AppError("Item id must be an integer not decimal", 400);
    }
};
exports.createPlanController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { planType, price, subType, benefits } = req.body;
    if (!planType || !subType || !benefits)
        throw new AppError_1.AppError(!planType ? "No data passed for planType" : !benefits ? "No data passed for benefits" : "No data passed for subType", 400);
    validateBenefitsObj(benefits);
    yield (0, createAdminPlan_1.createAdminPlan)(AdminPlan_1.AdminPlan.build({ planType, price, subType, benefits }));
    res.status(200).json({ message: "Plan has been created sucessfully" });
}));
exports.getAllPlansController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ allPlans: yield (0, getAllPlans_1.getAllPlans)() });
}));
exports.planSubcriptionController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const { planId } = req.params;
    const numRegExp = RegExp('^\d+$');
    checkIdValidy(planId);
    yield (0, subcribePlan_1.subscibeToPlan)(id, Number(planId));
    res.status(201).json({ message: "Subscribtion sucessfull" });
}));
