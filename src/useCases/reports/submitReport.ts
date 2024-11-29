import { Report } from "../../domain/entities/Report";
import { ReportRepoImpl } from "../../infrastructure/repository/reportRepoImplementation";





export const  submitReports=async (reportData:Report)=>{
    const {create}= new ReportRepoImpl();
    await create(reportData)
}