import { Report } from "../entities/Report";

export interface ReportRepository {
  create(reportData: Report): Promise<Report | null>;
  getAll(): Promise<Report[]>;
  getOne(id: number): Promise<Report | null>;
  update(reportData: Report): Promise<boolean>;
  deleteReport(id: number): Promise<boolean>;
}
