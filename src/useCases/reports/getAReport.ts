import { AppError } from "../../domain/entities/AppError";
import { ReportRepoImpl } from "../../infrastructure/repository/reportRepoImplementation";

export const getReport = async (reportId: number) => {
  const { getOne } = new ReportRepoImpl();
  const report = await getOne(reportId);
  if (!report) throw new AppError("No report with this id exist", 404);
  return report;
};
