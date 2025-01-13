import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { submitReports } from "../../useCases/reports/submitReport";
import { Report } from "../../domain/entities/Report";
import { getAllReports } from "../../useCases/reports/getAllReports";
import { getReport } from "../../useCases/reports/getAReport";
import { isStringContentNumber } from "../../@common/helperMethods/isStringNumber";
import { removeReport } from "../../useCases/reports/deleteReport";

export const createReportController = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, category } = req.body;
  await submitReports(Report.build({ title, description, category }));
  res.status(201).json({ message: "Report submited sucessfully" });
});

export const updateReportController = asyncHandler(async (req: Request, res: Response) => {});

export const getReportsController = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await getAllReports());
});

export const getReportController = asyncHandler(async (req: Request, res: Response) => {
  const { reportId } = req.params;
  isStringContentNumber(reportId, "reportId");
  res.status(200).json(await getReport(+reportId));
});

export const deleteReportController = asyncHandler(async (req: Request, res: Response) => {
  const { reportId } = req.params;
  isStringContentNumber(reportId, "reportId");
  await removeReport(+reportId);
  res.status(204).end();
});
