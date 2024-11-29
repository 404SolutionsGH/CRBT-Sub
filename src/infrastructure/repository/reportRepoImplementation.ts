import { Report } from "../../domain/entities/Report";
import { ReportRepository } from "../../domain/interfaces/ReportRepository";



export class ReportRepoImpl implements ReportRepository {
  async create(reportData: Report): Promise<Report | null> {
    const { title, description, category } = reportData;
    return await Report.create({ title, description, category });
  }
  async getAll(): Promise<Report[]> {
    return await Report.findAll();
  }
  async getOne(id: number): Promise<Report | null> {
    return await Report.findByPk(id)
  }
  async update(reportData: Report): Promise<boolean> {
    const { title, description, category, id } = reportData;
    const [numberOfUpdated] = await Report.update({ title, description, category }, { where: { id } });
    if (numberOfUpdated === 1) return true;
    return false;
  }
  async deleteReport(id: number): Promise<boolean> {
    const numberOfDeleted = await Report.destroy({ where: { id: id } });
    if (numberOfDeleted === 1) return true;
    return false;
  }
}