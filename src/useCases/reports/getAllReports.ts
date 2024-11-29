import { ReportRepoImpl } from "../../infrastructure/repository/reportRepoImplementation";

export const getAllReports = async () => {
  const { getAll } = new ReportRepoImpl();
  return await getAll();
};
