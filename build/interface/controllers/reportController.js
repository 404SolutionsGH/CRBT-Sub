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
exports.deleteReportController = exports.getReportController = exports.getReportsController = exports.updateReportController = exports.createReportController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const submitReport_1 = require("../../useCases/reports/submitReport");
const Report_1 = require("../../domain/entities/Report");
const getAllReports_1 = require("../../useCases/reports/getAllReports");
const getAReport_1 = require("../../useCases/reports/getAReport");
const isStringNumber_1 = require("../../@common/helperMethods/isStringNumber");
const deleteReport_1 = require("../../useCases/reports/deleteReport");
exports.createReportController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, category } = req.body;
    yield (0, submitReport_1.submitReports)(Report_1.Report.build({ title, description, category }));
    res.status(201).json({ message: "Report submited sucessfully" });
}));
exports.updateReportController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.getReportsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(yield (0, getAllReports_1.getAllReports)());
}));
exports.getReportController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reportId } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(reportId, "reportId");
    res.status(200).json(yield (0, getAReport_1.getReport)(+reportId));
}));
exports.deleteReportController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reportId } = req.params;
    (0, isStringNumber_1.isStringContentNumber)(reportId, "reportId");
    yield (0, deleteReport_1.removeReport)(+reportId);
    res.status(204).end();
}));
