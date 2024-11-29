import { AppError } from "../../domain/entities/AppError";
import { ReportRepoImpl } from "../../infrastructure/repository/reportRepoImplementation";

export const removeReport = async (reportId: number) => {
  const { deleteReport } = new ReportRepoImpl();
  if (!(await deleteReport(reportId))) throw new AppError("No report with such id exist", 404);
};
