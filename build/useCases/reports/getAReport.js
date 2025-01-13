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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReport = void 0;
const AppError_1 = require("../../domain/entities/AppError");
const reportRepoImplementation_1 = require("../../infrastructure/repository/reportRepoImplementation");
const getReport = (reportId) => __awaiter(void 0, void 0, void 0, function* () {
    const { getOne } = new reportRepoImplementation_1.ReportRepoImpl();
    const report = yield getOne(reportId);
    if (!report)
        throw new AppError_1.AppError("No report with this id exist", 404);
    return report;
});
exports.getReport = getReport;
